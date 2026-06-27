const validateBoardPayload = (data) => {
  const errors = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Board title is required.');
  }

  if (data.description && typeof data.description !== 'string') {
    errors.push('Board description must be a string.');
  }

  return errors;
};

module.exports = {
  validateBoardPayload,
};
