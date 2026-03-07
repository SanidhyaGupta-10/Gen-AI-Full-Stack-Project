import OpenAI from "openai";

const apiKey = process.env.GROQ_API_KEY;

const client = new OpenAI({
  apiKey,
  baseURL: "https://api.groq.com/openai/v1"
});

export default async function main() {
  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "user", content: "Hello, how does AI work?" }
    ]
  });

  console.log(response.choices[0]?.message.content);
}

