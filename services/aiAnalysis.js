// services/aiAnalysis.js - Advanced AI features for issue analysis
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Determine urgency level of a support request
 * @param {string} complaint - Customer complaint text
 * @returns {Promise<string>} Urgency level: 'Low', 'Medium', 'High'
 */
async function generateUrgency(complaint) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at analyzing customer support requests. Determine the urgency level based on the complaint. Respond with only one word: Low, Medium, or High.'
        },
        {
          role: 'user',
          content: complaint
        }
      ],
      temperature: 0.3,
      max_tokens: 10
    });

    const urgency = response.choices[0].message.content.trim();
    return ['Low', 'Medium', 'High'].includes(urgency) ? urgency : 'Medium';
  } catch (error) {
    console.error('Error generating urgency:', error);
    return 'Medium'; // Default to Medium on error
  }
}

/**
 * Auto-categorize the issue
 * @param {string} subject - Issue subject
 * @param {string} complaint - Complaint description
 * @returns {Promise<string>} Issue category
 */
async function categorizeIssue(subject, complaint) {
  try {
    const text = `${subject}. ${complaint}`;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Categorize this support issue into one of these categories: Billing, Technical, Account, Product, Other. Respond with only the category name.'
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 20
    });

    const category = response.choices[0].message.content.trim();
    const validCategories = ['Billing', 'Technical', 'Account', 'Product', 'Other'];
    return validCategories.includes(category) ? category : 'Other';
  } catch (error) {
    console.error('Error categorizing issue:', error);
    return 'Other'; // Default to Other on error
  }
}

module.exports = { generateUrgency, categorizeIssue };
