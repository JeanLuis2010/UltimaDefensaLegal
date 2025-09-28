// /netlify/functions/track.js
exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body || "{}");

    const logLine = JSON.stringify({
      time: new Date().toISOString(),
      ...payload
    });

    console.log("UDL TRACK:", logLine);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON" };
  }
};
