import { NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";

async function sendBrevoEmail({ to, subject, htmlContent, textContent, replyTo }) {
  const response = await fetch(BREVO_SMTP_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || "The Neighbourhood Cocktails",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to,
      replyTo,
      subject,
      htmlContent,
      textContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo feedback email failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

function cleanValue(value, maxLength = 1000) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    // 1. Check if running in Mock Mode (no Brevo API key provided or set to 'mock')
    const isMockMode = !process.env.BREVO_API_KEY || process.env.BREVO_API_KEY === "mock";

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    // 2. Extract and clean inputs
    const name = cleanValue(body.name, 120);
    const email = cleanValue(body.email, 180).toLowerCase();
    const drinkName = cleanValue(body.drinkName, 180);
    const drinkRating = parseInt(body.drinkRating, 10);
    const improvements = cleanValue(body.improvements, 2000);
    const recommend = cleanValue(body.recommend, 10); // "Yes" or "No"
    const notifyPref = Array.isArray(body.notifyPref) ? body.notifyPref : [];
    const whatsappPhone = cleanValue(body.whatsappPhone, 40);
    const instagramHandle = cleanValue(body.instagramHandle, 80);

    // 3. Validation check
    if (!name || !email || isNaN(drinkRating) || !recommend) {
      return NextResponse.json(
        { error: "Name, email, rating, and recommendation are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 4. Identify dynamic list buckets
    const listIds = [];
    
    // Promoters List (Recommend Yes & Rating >= 4)
    const promotersListId = process.env.BREVO_PROMOTERS_LIST_ID 
      ? parseInt(process.env.BREVO_PROMOTERS_LIST_ID, 10) 
      : 101;
      
    // Critique List (Recommend No OR Rating <= 2)
    const critiquesListId = process.env.BREVO_CRITIQUES_LIST_ID 
      ? parseInt(process.env.BREVO_CRITIQUES_LIST_ID, 10) 
      : 102;
      
    // Popup alerts list
    const popupsListId = process.env.BREVO_POPUPS_LIST_ID 
      ? parseInt(process.env.BREVO_POPUPS_LIST_ID, 10) 
      : 103;

    if (recommend === "Yes" && drinkRating >= 4) {
      listIds.push(promotersListId);
    } else if (recommend === "No" || drinkRating <= 2) {
      listIds.push(critiquesListId);
    }

    if (notifyPref.includes("email")) {
      listIds.push(popupsListId);
    }

    // 5. Build CRM attributes payload
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const attributes = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      DRINK_CONSUMED: drinkName || "Not Specified",
      DRINK_RATING: drinkRating,
      IMPROVEMENTS: improvements || "",
      RECOMMEND: recommend,
      NOTIFY_PREF: notifyPref.length ? notifyPref.join(", ") : "None",
    };

    // Attach Whatsapp if requested
    if (whatsappPhone) {
      attributes.WHATSAPP = whatsappPhone;
      // Standardized digits-only for SMS automation lists in Brevo
      attributes.SMS = whatsappPhone.replace(/\D/g, "");
    }

    // Attach Instagram if requested
    if (instagramHandle) {
      attributes.INSTAGRAM = instagramHandle.startsWith("@") 
        ? instagramHandle 
        : `@${instagramHandle}`;
    }

    // 6. Mock Mode / Live switch
    if (isMockMode) {
      console.log("==========================================");
      console.log("   🧪 BREVO CRM MOCK SUBMISSION (SUCCESS)  ");
      console.log("==========================================");
      console.log("📧 CONTACT EMAIL :", email);
      console.log("📊 CRM ATTRIBUTES:", JSON.stringify(attributes, null, 2));
      console.log("📁 LIST BUCKETS  :", listIds.filter(Boolean));
      console.log("📨 MOCK TRANSACTIONAL EMAIL (CUSTOMER):");
      console.log("   To     :", email);
      console.log("   Subject: Thank you for your feedback! - The Neighbourhood Cocktails");
      
      const isCritique = recommend === "No" || drinkRating <= 2;
      if (isCritique) {
        console.log("🚨 MOCK TRANSACTIONAL EMAIL (ADMIN ALERT):");
        console.log("   To     :", process.env.BOOKING_RECIPIENT_EMAIL || "bookings@example.com");
        console.log("   Subject: 🚨 Critical Feedback Alert: " + name + " left a review");
      }
      console.log("==========================================");

      // Simulate a standard 600ms network delay for fluid UI feedback
      await new Promise((resolve) => setTimeout(resolve, 600));

      return NextResponse.json({ ok: true, message: "Mock success! Feedback and emails logged to console." });
    }

    // 7. Post to Brevo API (CRM)
    const response = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds: listIds.filter(Boolean),
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API feedback post failed:", response.status, errorText);
      return NextResponse.json(
        { error: "We could not record your feedback right now. Please try again." },
        { status: 502 }
      );
    }

    // 8. Dispatch Transactional Emails
    try {
      if (process.env.BREVO_SENDER_EMAIL) {
        const customerName = name.trim().split(/\s+/)[0];
        
        // Send a Thank-You Email to the Customer
        const customerHtml = `<!doctype html>
          <html>
            <body style="margin:0;padding:24px;background:#f6efe3;font-family:Arial,sans-serif;color:#10271e;">
              <main style="max-width:620px;margin:0 auto;background:#fffaf2;border-radius:16px;padding:28px;">
                <h1 style="margin:0 0 12px;color:#1f4d3a;font-size:24px;">Thank you for your feedback!</h1>
                <p style="line-height:1.7;">Hi ${customerName},</p>
                <p style="line-height:1.7;">We really appreciate you taking a moment to tell us about your experience drinking our <strong>${drinkName}</strong> (which you rated ${drinkRating}/5 stars!).</p>
                <p style="line-height:1.7;">Your thoughts help us keep refining our craft and delivering the polished, warm bar service we strive for.</p>
                <p style="line-height:1.7;margin-top:24px;">Cheers,<br/><strong>The Neighbourhood Cocktails Team</strong></p>
              </main>
            </body>
          </html>`;
        
        await sendBrevoEmail({
          to: [{ email, name }],
          replyTo: {
            email: process.env.BREVO_SENDER_EMAIL,
            name: process.env.BREVO_SENDER_NAME || "The Neighbourhood Cocktails"
          },
          subject: "Thank you for your feedback! - The Neighbourhood Cocktails",
          htmlContent: customerHtml,
          textContent: `Hi ${customerName},\n\nWe appreciate your feedback on the ${drinkName} (rated ${drinkRating}/5). Thank you for helping us refine our craft!\n\nCheers,\nThe Neighbourhood Cocktails Team`
        });

        // Send a High-Priority Alert to Admin if it's a critique
        const isCritique = recommend === "No" || drinkRating <= 2;
        if (isCritique && process.env.BOOKING_RECIPIENT_EMAIL) {
          const adminHtml = `<!doctype html>
            <html>
              <body style="margin:0;padding:24px;background:#f6efe3;font-family:Arial,sans-serif;color:#10271e;">
                <main style="max-width:620px;margin:0 auto;background:#fffaf2;border-radius:16px;overflow:hidden;">
                  <div style="padding:24px;background:#b64646;color:#fffaf2;">
                    <h1 style="margin:0;font-size:24px;">Critical Feedback Alert</h1>
                    <p style="margin:8px 0 0;">A guest left a critical review for The Neighbourhood Cocktails.</p>
                  </div>
                  <div style="padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 16px 16px;">
                    <p style="margin:0 0 8px;"><strong>Name:</strong> ${name}</p>
                    <p style="margin:0 0 8px;"><strong>Email:</strong> ${email}</p>
                    <p style="margin:0 0 8px;"><strong>Drink Consumed:</strong> ${drinkName}</p>
                    <p style="margin:0 0 8px;"><strong>Drink Rating:</strong> ${drinkRating}/5</p>
                    <p style="margin:0 0 16px;"><strong>Would Recommend:</strong> ${recommend}</p>
                    <div style="margin-top:16px;white-space:pre-wrap;line-height:1.6;background:#fcf8f2;padding:12px;border-radius:8px;border-left:4px solid #b64646;color:#10271e;"><strong>Improvement Comments:</strong><br/>${improvements || "None provided"}</div>
                  </div>
                </main>
              </body>
            </html>`;

          await sendBrevoEmail({
            to: [{ email: process.env.BOOKING_RECIPIENT_EMAIL, name: "The Neighbourhood Cocktails" }],
            replyTo: { email, name },
            subject: `🚨 Critical Feedback Alert: ${name} left a review`,
            htmlContent: adminHtml,
            textContent: `Critical Feedback Alert\n\nName: ${name}\nEmail: ${email}\nDrink: ${drinkName}\nRating: ${drinkRating}/5\nRecommend: ${recommend}\nComments: ${improvements || "None"}`
          });
        }
      }
    } catch (emailError) {
      console.warn("Transactional email dispatch failed during feedback post:", emailError);
    }

    return NextResponse.json({ ok: true, message: "Thank you for your feedback!" });
  } catch (error) {
    console.error("Feedback route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
