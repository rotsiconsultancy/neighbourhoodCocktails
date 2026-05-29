import { NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

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
      console.log("==========================================");

      // Simulate a standard 600ms network delay for fluid UI feedback
      await new Promise((resolve) => setTimeout(resolve, 600));

      return NextResponse.json({ ok: true, message: "Mock success! Feedback printed to console." });
    }

    // 7. Post to Brevo API
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

    return NextResponse.json({ ok: true, message: "Thank you for your feedback!" });
  } catch (error) {
    console.error("Feedback route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
