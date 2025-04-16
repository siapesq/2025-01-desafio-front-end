const { GoogleGenerativeAI } = require("@google/generative-ai");
import "dotenv/config";

// documentação : https://github.com/google/generative-ai-js
// documentação : https://ai.google.dev/gemini-api/docs/quickstart?hl=pt-br&lang=node
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // systemInstruction: "you are a consultant and you are talking to a client",
});


//TODO: Procurar um melhor lugar para colocar
export async function generateInsights(salesData: any[]) {
    const prompt = `
      Analise os seguintes dados de vendas dos últimos 30 dias e forneça insights sobre:
      - Tendências de vendas
      - Recomendações para otimização
  
      Dados:
      ${JSON.stringify(salesData, null, 2)}
    `;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }