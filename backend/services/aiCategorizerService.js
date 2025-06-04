const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function categorizeEmailBatch(emails) {
  if (!emails.length) return [];

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are an email categorizer. Classify the following emails into one of these categories:
["Interested", "Meeting Booked", "Not Interested", "Spam", "Out of Office"]

Respond in this format: ["Category1", "Category2", ..., "CategoryN"]

Emails:\n${emails
    .map(
      (email, i) =>
        `${i + 1}. Subject: ${email.subject || 'No subject'}\nBody: ${email.text || 'No body'}`
    )
    .join('\n\n')}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const match = text.match(/\[(.*?)\]/s);
    if (!match) throw new Error('Invalid response format');

    const categories = JSON.parse(match[0]);
    if (!Array.isArray(categories)) throw new Error('Parsed categories is not an array');

    return categories;
  } catch (err) {
    console.error('Gemini batch classification failed:', err);
    return emails.map(() => 'Uncategorized');
  }
}

module.exports = {
  categorizeEmailBatch,
};
