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
    // Gửi dữ liệu gốc đi luôn
    const response = await axios.post(
      "https://cms.emimfi.com:5000/api/Webchannel/Post",
      req.body, // 👈 Forward toàn bộ body
      {
        headers: {
          // "Content-Type": "application/json", // 👈 sửa tùy endpoint phía sau
          ...req.headers, // giữ nguyên headers nếu cần
        },
        httpsAgent,
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
