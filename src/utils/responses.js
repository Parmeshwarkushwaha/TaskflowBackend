const sendSuccess = (res, data, message = 'Success', status = 200) => res.status(status).json({ message, data });

const sendError = (res, error, status = 400) => {
  const message = error instanceof Error ? error.message : error;
  return res.status(status).json({ message });
};

module.exports = {
  sendSuccess,
  sendError,
};
