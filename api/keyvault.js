import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { clientId, clientSecret } = req.body;

  if (!clientId || !clientSecret) {
    return res.status(400).json({ error: "Missing clientId or clientSecret" });
  }

  try {
    const params = new URLSearchParams();
    params.append("clientId", clientId);
    params.append("clientSecret", clientSecret);

    const response = await axios.post(
      "https://keyvault.emimfi.com:2025/api/v1/auth/universal-auth/login",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}