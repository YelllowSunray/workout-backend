import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express();
app.use(express.json());
app.use(cors());

// Hardcoded API key (not recommended)
const openaiClient = new OpenAI({ apiKey: "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" });

app.post("/format", async (req, res) => {
  try {
    const { workout_data } = req.body;
    
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Format this workout data: ${JSON.stringify(workout_data)}` }],
    });

    res.json({ formatted: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Workout Backend is Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
