import nodemailer from "nodemailer";

const BREVO_SEND_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

function getSmtpConfig() {
  const host = process.env.BREVO_SMTP_HOST || process.env.SMTP_HOST || "smtp-relay.brevo.com";
  const port = Number(process.env.BREVO_SMTP_PORT || process.env.SMTP_PORT || 587);
  const user = process.env.BREVO_SMTP_LOGIN || process.env.SMTP_USER;
  const pass = process.env.BREVO_SMTP_API_KEY || process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  };
}

function cleanValue(value, maxLength = 500) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return cleanValue(value, 3000)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function detailRow(label, value) {
  if (!value) {
    return "";
  }

  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:700;color:#1f4d3a;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#10271e;">${escapeHtml(value)}</td>
  </tr>`;
}

async function sendBrevoEmail({ to, subject, htmlContent, textContent, replyTo }) {
  const response = await fetch(BREVO_SEND_EMAIL_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || "The Neighbourhood Cocktails",
        email: process.env.BREVO_SENDER_EMAIL
      },
      to,
      replyTo,
      subject,
      htmlContent,
      textContent
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo email failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

async function sendSmtpEmail({ to, subject, htmlContent, textContent, replyTo }) {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    throw new Error("SMTP is not configured. Set BREVO_SMTP_LOGIN and BREVO_SMTP_API_KEY.");
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  return transporter.sendMail({
    from: {
      name: process.env.BREVO_SENDER_NAME || "The Neighbourhood Cocktails",
      address: process.env.BREVO_SENDER_EMAIL
    },
    to: to.map((recipient) => ({
      name: recipient.name,
      address: recipient.email
    })),
    replyTo: replyTo
      ? {
          name: replyTo.name,
          address: replyTo.email
        }
      : undefined,
    subject,
    html: htmlContent,
    text: textContent
  });
}

async function sendBookingEmail(message) {
  if (getSmtpConfig()) {
    return sendSmtpEmail(message);
  }

  return sendBrevoEmail(message);
}

async function saveBrevoContact({ email, name, eventDate, location, guests, eventType, serviceStyle, preferences, notes }) {
  const listId = Number(process.env.BREVO_CONTACT_LIST_ID);

  if (!listId) {
    return;
  }

  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  try {
    await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          EVENT_DATE: eventDate || "",
          LOCATION: location || "",
          GUEST_COUNT: guests ? parseInt(guests, 10) : null,
          EVENT_TYPE: eventType || "",
          SERVICE_STYLE: serviceStyle || "",
          DRINK_PREFERENCES: Array.isArray(preferences) ? preferences.join(", ") : (preferences || ""),
          SPECIAL_NOTES: notes || ""
        },
        listIds: [listId],
        updateEnabled: true
      })
    });
  } catch (error) {
    console.warn("Brevo contact save failed", error);
  }
}

export async function POST(request) {
  const isEmailEnabled = process.env.BREVO_IS_EMAIL_ENABLED === "true";

  if (!process.env.BREVO_SENDER_EMAIL || !process.env.BOOKING_RECIPIENT_EMAIL) {
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  if (isEmailEnabled && !getSmtpConfig() && !process.env.BREVO_API_KEY) {
    return Response.json({ error: "Email service is not configured. Set SMTP credentials or BREVO_API_KEY." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return Response.json({ error: "Invalid booking request." }, { status: 400 });
  }

  const name = cleanValue(body.name, 120);
  const email = cleanValue(body.email, 180).toLowerCase();
  const eventDate = cleanValue(body.date, 80);
  const location = cleanValue(body.location, 180);
  const guests = cleanValue(body.guests, 40);
  const eventType = cleanValue(body.eventType, 120);
  const serviceStyle = cleanValue(body.serviceStyle, 120);
  const notes = cleanValue(body.notes, 1500);
  const preferences = Array.isArray(body.preferences)
    ? body.preferences.map((preference) => cleanValue(preference, 80)).filter(Boolean)
    : [];

  if (!name || !email || !eventDate) {
    return Response.json({ error: "Name, email, and event date are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const preferenceText = preferences.length ? preferences.join(", ") : "None selected";
  const adminHtml = `<!doctype html>
    <html>
      <body style="margin:0;padding:24px;background:#f6efe3;font-family:Arial,sans-serif;color:#10271e;">
        <main style="max-width:680px;margin:0 auto;background:#fffaf2;border-radius:16px;overflow:hidden;">
          <div style="padding:24px;background:#1f4d3a;color:#fffaf2;">
            <h1 style="margin:0;font-size:24px;">New booking request</h1>
            <p style="margin:8px 0 0;">The Neighbourhood Cocktails website form was submitted.</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${detailRow("Name", name)}
            ${detailRow("Email", email)}
            ${detailRow("Event date", eventDate)}
            ${detailRow("Location", location)}
            ${detailRow("Guest count", guests)}
            ${detailRow("Event type", eventType)}
            ${detailRow("Service style", serviceStyle)}
            ${detailRow("Drink preferences", preferenceText)}
          </table>
          <div style="padding:24px;">
            <h2 style="margin:0 0 10px;color:#1f4d3a;font-size:18px;">Special requests</h2>
            <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(notes || "None provided")}</p>
          </div>
        </main>
      </body>
    </html>`;

  const adminText = [
    "New booking request",
    `Name: ${name}`,
    `Email: ${email}`,
    `Event date: ${eventDate}`,
    `Location: ${location || "Not provided"}`,
    `Guest count: ${guests || "Not provided"}`,
    `Event type: ${eventType || "Not provided"}`,
    `Service style: ${serviceStyle || "Not provided"}`,
    `Drink preferences: ${preferenceText}`,
    `Special requests: ${notes || "None provided"}`
  ].join("\n");

  const confirmationHtml = `<!doctype html>
    <html>
      <body style="margin:0;padding:24px;background:#f6efe3;font-family:Arial,sans-serif;color:#10271e;">
        <main style="max-width:620px;margin:0 auto;background:#fffaf2;border-radius:16px;padding:28px;">
          <h1 style="margin:0 0 12px;color:#1f4d3a;font-size:24px;">We received your booking request.</h1>
          <p style="line-height:1.7;">Hi ${escapeHtml(name)},</p>
          <p style="line-height:1.7;">Thanks for reaching out to The Neighbourhood Cocktails. We have your request for ${escapeHtml(eventDate)} and will get back to you within 24 hours.</p>
          <p style="line-height:1.7;">If anything changes before then, reply to this email with the updated details.</p>
        </main>
      </body>
    </html>`;

  try {
    if(isEmailEnabled){
      console.log("Sending booking request emails...");
      await sendBookingEmail({
        to: [{ email: process.env.BOOKING_RECIPIENT_EMAIL, name: "The Neighbourhood Cocktails" }],
        replyTo: { email, name },
        subject: `New booking request from ${name}`,
        htmlContent: adminHtml,
        textContent: adminText
      });

      console.log("Sending booking confirmation email to user...");

      await sendBookingEmail({
        to: [{ email, name }],
        replyTo: {
          email: process.env.BOOKING_RECIPIENT_EMAIL,
          name: process.env.BREVO_SENDER_NAME || "The Neighbourhood Cocktails"
        },
        subject: "We received your booking request",
        htmlContent: confirmationHtml,
        textContent: `Hi ${name},\n\nThanks for reaching out to The Neighbourhood Cocktails. We have your request for ${eventDate} and will get back to you within 24 hours.`
      });
    }

    console.log("Saving booking request to Brevo contacts...");
    await saveBrevoContact({
      email,
      name,
      eventDate,
      location,
      guests,
      eventType,
      serviceStyle,
      preferences,
      notes
    });
    console.log("Booking request processed successfully.");
  } catch (error) {
    console.error(error);
    return Response.json({ error: "We could not send your request right now. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
