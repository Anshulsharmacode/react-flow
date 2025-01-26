import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function getPizzaRecommendation(preferences: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const prompt = `As a pizza expert, analyze these preferences: "${preferences}"
    and provide a personalized recommendation. Consider dietary preferences, spice levels, and flavor combinations.
    Also suggest a recommended quantity based on the preferences.
    Format your response exactly as JSON:
    {
      "recommendedPizza": "Name and brief description",
      "reason": "Why this matches their preferences",
      "instructions": "Special preparation instructions",
      "suggestedToppings": ["topping1", "topping2", "topping3"],
      "suggestedQuantity": 1
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error getting pizza recommendations:", error);
    return {
      recommendedPizza: "Custom Pizza",
      reason: "Based on your preferences",
      instructions: "Standard preparation",
      suggestedToppings: ["Cheese", "Tomato Sauce"],
      suggestedQuantity: 1,
    };
  }
}
