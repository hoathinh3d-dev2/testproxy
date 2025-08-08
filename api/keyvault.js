import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: true,
  servername: "cms.emimfi.com"
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Forwarding headers:", req.headers);
    const response = await axios.post(
      "https://cms.emimfi.com:5000/api/Webchannel/Post",
      req.body,
      {
        headers: {
          ...req.headers,
        },
        // httpsAgent,
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    const status = error.response?.status || 500;
    const details = error.response?.data || error.message;
    res.status(status).json({ error: "Proxy error", details });
  }
}
