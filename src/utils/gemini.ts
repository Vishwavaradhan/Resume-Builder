export async function getCareerRecommendation(skills: string[]) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY || skills.length === 0) {
    return null;
  }

  const prompt = `
You are a career guidance AI.

Based on these skills:
${skills.join(', ')}

1. Suggest ONE best career role
2. Give a match percentage (0–100)
3. Explain in 2 short lines why

Return response strictly in this format:
Role: <role>
Score: <number>
Reason: <text>
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) return null;

    const role = text.match(/Role:\s*(.*)/)?.[1];
    const score = text.match(/Score:\s*(\d+)/)?.[1];
    const reason = text.match(/Reason:\s*(.*)/)?.[1];

    return {
      role: role || 'Recommended Career',
      score: score ? Number(score) : 0,
      reason: reason || '',
    };
  } catch (error) {
    console.error('Gemini error:', error);
    return null;
  }
}
