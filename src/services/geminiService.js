const axios = require('axios');

const suggestEstimate = async ({ title, description }) => {
  const systemPrompt = `You are an expert project manager estimating effort and due dates for a task. Provide a concise JSON response with keys effort, dueDate, and reason.`;
  const userContent = `Task title: ${title}\nTask description: ${description}`;

  const response = await axios.post(
    process.env.GEMINI_API_URL,
    {
      model: process.env.GEMINI_MODEL || 'gemini-1.5',
      prompt: `${systemPrompt}\n\n${userContent}`,
      max_tokens: 250,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
    },
  );

  const value = response.data?.choices?.[0]?.message?.content || response.data?.output;
  if (!value) {
    throw new Error('No response from Gemini API');
  }

  const rawText = typeof value === 'string' ? value : JSON.stringify(value);
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return {
      effort: parsed.effort || '2',
      dueDate: parsed.dueDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reason: parsed.reason || 'AI generated estimate based on task description.',
    };
  } catch (error) {
    throw new Error('Unable to parse Gemini response');
  }
};

module.exports = {
  suggestEstimate,
};
