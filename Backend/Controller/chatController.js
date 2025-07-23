import model from '../config/gemini.js';
const chatWithGemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({ error: 'Valid prompt is required' });
    }

    console.log('Received prompt:', prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response:', text);
    res.json({ success: true, response: text });
  } catch (error) {
    console.error('Error in chatWithGemini:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
export default chatWithGemini;