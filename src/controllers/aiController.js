const { suggestEstimate } = require('../services/geminiService');

exports.suggest = async (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ message: 'Task title is required for suggestion.' });
  }

  try {
    const suggestion = await suggestEstimate({ title: title.trim(), description: description?.trim() || '' });
    return res.status(200).json({ message: 'AI suggestion generated successfully.', data: suggestion });
  } catch (error) {
    return res.status(200).json({
      message: 'AI suggestion is unavailable. Using fallback estimate.',
      data: {
        effort: 3,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        reason: 'Fallback estimate due to AI service error.',
      },
    });
  }
};
