// /netlify/functions/ivr-check-subscriber.js
export const config = { path: "/api/ivr/check-subscriber" };

export default async (req, res) => {
  try {
    const body = await readJson(req);
    const phone = (body.phone || "").replace(/\D+/g, "");

    // TODO: Replace with your real membership check (Stripe/DB).
    // For now: treat all numbers with 10 digits ending in an odd digit as "paid".
    const isSubscriber = phone.length >= 10 && parseInt(phone.slice(-1), 10) % 2 === 1;

    return json(res, 200, {
      isSubscriber,
      plan: isSubscriber ? "monthly" : null,
      language: "en" // or "es" if you detect from CRM
    });
  } catch (e) {
    return json(res, 500, { error: "server_error" });
  }
};

async function readJson(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); }
  catch { return {}; }
}

function json(res, code, obj) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(obj));
}
