const Board = require('../models/Board');
const Task = require('../models/Task');
const { validateTaskPayload } = require('../validators/taskValidators');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id }).populate('board', 'title');
  return res.status(200).json({ message: 'Tasks retrieved successfully.', data: { tasks } });
};

exports.createTask = async (req, res) => {
  const errors = validateTaskPayload(req.body);
  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') });
  }

  const board = await Board.findOne({ _id: req.body.board, owner: req.user._id });
  if (!board) {
    return res.status(404).json({ message: 'Board not found or access denied.' });
  }

  const task = await Task.create({
    title: req.body.title.trim(),
    description: req.body.description?.trim() || '',
    priority: req.body.priority,
    status: req.body.status,
    dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
    estimatedEffort: req.body.estimatedEffort,
    board: board._id,
    owner: req.user._id,
  });

  return res.status(201).json({ message: 'Task created successfully.', data: { task } });
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
  if (!task) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  const errors = validateTaskPayload(req.body);
  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') });
  }

  const board = await Board.findOne({ _id: req.body.board, owner: req.user._id });
  if (!board) {
    return res.status(404).json({ message: 'Board not found or access denied.' });
  }

  task.title = req.body.title.trim();
  task.description = req.body.description?.trim() || '';
  task.priority = req.body.priority;
  task.status = req.body.status;
  task.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : undefined;
  task.estimatedEffort = req.body.estimatedEffort;
  task.board = board._id;

  await task.save();

  return res.status(200).json({ message: 'Task updated successfully.', data: { task } });
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!task) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  return res.status(200).json({ message: 'Task deleted successfully.', data: { taskId: task._id } });
};

exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  if (!status || !['todo', 'in-progress', 'done'].includes(status)) {
    return res.status(400).json({ message: 'Status must be todo, in-progress, or done.' });
  }

  const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
  if (!task) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  task.status = status;
  await task.save();

  return res.status(200).json({ message: 'Task status updated.', data: { task } });
};
