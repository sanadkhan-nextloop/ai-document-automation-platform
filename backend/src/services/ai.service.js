const OpenAI = require("openai");
const { OPENAI_API_KEY } = require("../config/env");

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

exports.generateText = async ({ prompt, context }) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You generate text to be inserted directly into documents."
      },
      {
        role: "user",
        content: `
Context from document:
${context}

User instruction:
${prompt}

Write concise, professional text suitable for a document.
        `
      }
    ],
    temperature: 0.4,
    max_tokens: 300
  });

  return completion.choices[0].message.content;
};
