import express from "express";
import fetch from "node-fetch"; // or built-in fetch if using Node 18+
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: "10mb" })); // allow large image data

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // store key in env for safety

// Helper function to analyze a single image
async function analyzeImageWithGemini(imageBase64, subject) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro-vision-latest:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = {
        input: [
            {
                text_segments: [
                    {
                        text: `Analyze this ${subject} study material image. Provide:
1. A detailed explanation of what's shown
2. Key concepts to remember
3. Study questions based on the content
4. Memory tips for better retention

Focus on GCSE level understanding for ${subject}.`
                    }
                ],
                image_bytes: imageBase64 // Use image_bytes for Gemini Vision
            }
        ],
        candidate_count: 1,
        temperature: 0.4,
        max_output_tokens: 2048
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.candidates?.[0]?.content?.[0]?.text;

    if (!analysisText) throw new Error("Invalid response from Gemini API");

    return analysisText; // Or parseGeminiResponse(analysisText, subject) if you want structured output
}

// Endpoint to process multiple uploaded images
app.post("/api/analyze-images", async (req, res) => {
    try {
        const { images, subject } = req.body; // images = array of base64 strings

        if (!images || !Array.isArray(images)) {
            return res.status(400).json({ error: "Invalid images array" });
        }

        const results = [];
        for (const img of images) {
            const analysis = await analyzeImageWithGemini(img, subject);
            results.push(analysis);
        }

        res.json({ success: true, analyses: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
