const PRIORITY_VALUES = ['low', 'medium', 'high'];
const STATUS_VALUES = ['todo', 'in-progress', 'done'];

const validateTaskPayload = (data) => {
  const errors = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Task title is required.');
  }

  if (!data.priority || !PRIORITY_VALUES.includes(data.priority)) {
    errors.push('Task priority must be low, medium, or high.');
  }

  if (!data.status || !STATUS_VALUES.includes(data.status)) {
    errors.push('Task status must be todo, in-progress, or done.');
  }

  if (data.estimatedEffort !== undefined && typeof data.estimatedEffort !== 'number') {
    errors.push('Estimated effort must be a number.');
  }

  if (data.dueDate && Number.isNaN(Date.parse(data.dueDate))) {
    errors.push('Due date must be a valid date.');
  }

  if (!data.board) {
    errors.push('Task board id is required.');
  }

  return errors;
};

module.exports = {
  validateTaskPayload,
  PRIORITY_VALUES,
  STATUS_VALUES,
};
