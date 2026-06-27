const validateRegister = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters.');
  }
  if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.push('Valid email address is required.');
  }
  if (!data.password || data.password.length < 8) {
    errors.push('Password is required and must be at least 8 characters.');
  }

  return errors;
};

const validateLogin = (data) => {
  const errors = [];

  if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.push('Valid email address is required.');
  }
  if (!data.password || data.password.length < 8) {
    errors.push('Password is required and must be at least 8 characters.');
  }

  return errors;
};

module.exports = {
  validateRegister,
  validateLogin,
};
