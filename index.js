// index.js
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Replace with your actual Fyers values
const CLIENT_ID = "MWJTP84XOV-100";
const SECRET_ID = "NM4R36QYF9";
const REDIRECT_URI = "https://fyers-redirect.vercel.app";

app.get("/", (req, res) => {
    res.send("✅ Backend server is live!");
});

// Step 2: Handle Fyers redirect with auth code
app.get("/auth/fyers/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send("❌ No authorization code received.");
    }

    try {
        const response = await axios.post("https://api.fyers.in/api/v2/token", {
            grant_type: "authorization_code",
            code: code,
            client_id: CLIENT_ID,
            secret_id: SECRET_ID,
            redirect_uri: REDIRECT_URI,
        });

        console.log("✅ Token response:", response.data);

        // Send token back to frontend or save it
        res.send(`
            <h2>✅ Fyers Token Received!</h2>
            <pre>${JSON.stringify(response.data, null, 2)}</pre>
        `);
    } catch (error) {
        console.error("❌ Error exchanging token:", error.response?.data || error.message);
        res.status(500).send("❌ Token exchange failed.");
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
