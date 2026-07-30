import { createHash } from "node:crypto";

const DEFAULT_GRAPH_API_VERSION = "v23.0";

function sha256(value) {
  return createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export async function sendMetaLeadEvent({
  email,
  eventId,
  eventType,
  sourceUrl,
  clientIpAddress,
  clientUserAgent,
  fbp,
  fbc,
}) {
  const pixelId = process.env.META_PIXEL_ID || "2277689509707110";
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;

  if (!accessToken || !eventId || !email) {
    return { sent: false, reason: "not-configured" };
  }

  const graphVersion =
    process.env.META_GRAPH_API_VERSION || DEFAULT_GRAPH_API_VERSION;
  const endpoint = new URL(
    `https://graph.facebook.com/${graphVersion}/${pixelId}/events`
  );
  endpoint.searchParams.set("access_token", accessToken);

  const userData = {
    em: [sha256(email)],
    client_user_agent: clientUserAgent,
    client_ip_address: clientIpAddress,
    fbp,
    fbc,
  };

  Object.keys(userData).forEach((key) => {
    if (!userData[key]) delete userData[key];
  });

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: sourceUrl,
        user_data: userData,
        custom_data: {
          content_name: "Booking Request",
          content_category: eventType || "Event enquiry",
        },
      },
    ],
  };

  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Meta Conversions API failed (${response.status}): ${responseText.slice(0, 300)}`
    );
  }

  return { sent: true };
}
