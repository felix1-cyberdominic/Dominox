// services/aiService.js - OpenAI integration for support responses
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate an AI-powered support response
 * @param {Object} request - Support request data
 * @param {string} request.subject - Issue subject
 * @param {string} request.complaint - Customer complaint description
 * @returns {Promise<Object>} AI-generated response
 */
async function generateResponse(request) {
  try {
    const { subject, complaint } = request;

    const prompt = `You are a professional and empathetic customer support agent. 
    
Customer Issue: ${subject}
Customer Complaint: ${complaint}

Please provide a helpful and professional response that:
1. Acknowledges the customer's concern
2. Shows empathy and understanding
3. Offers a solution or next steps
4. Maintains a friendly and professional tone

Keep the response concise but comprehensive (2-3 paragraphs).`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful customer support representative.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return {
      response: response.choices[0].message.content,
      tokens: response.usage.total_tokens,
      model: response.model
    };
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}

module.exports = { generateResponse };
