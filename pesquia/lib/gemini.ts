const { GoogleGenerativeAI } = require("@google/generative-ai");
import "dotenv/config";

// documentação : https://github.com/google/generative-ai-js
// documentação : https://ai.google.dev/gemini-api/docs/quickstart?hl=pt-br&lang=node
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // systemInstruction: "you are a consultant and you are talking to a client",
});