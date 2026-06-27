const Board = require('../models/Board');
const Task = require('../models/Task');
const { validateBoardPayload } = require('../validators/boardValidators');

exports.getBoards = async (req, res) => {
  const boards = await Board.find({ owner: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json({ message: 'Boards retrieved successfully.', data: { boards } });
};

exports.createBoard = async (req, res) => {
  const errors = validateBoardPayload(req.body);
  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') });
  }

  const board = await Board.create({
    title: req.body.title.trim(),
    description: req.body.description?.trim() || '',
    owner: req.user._id,
  });

  return res.status(201).json({ message: 'Board created successfully.', data: { board } });
};

exports.updateBoard = async (req, res) => {
  const board = await Board.findOne({ _id: req.params.id, owner: req.user._id });
  if (!board) {
    return res.status(404).json({ message: 'Board not found.' });
  }

  const errors = validateBoardPayload(req.body);
  if (errors.length) {
    return res.status(400).json({ message: errors.join(' ') });
  }

  board.title = req.body.title.trim();
  board.description = req.body.description?.trim() || '';
  await board.save();

  return res.status(200).json({ message: 'Board updated successfully.', data: { board } });
};

exports.deleteBoard = async (req, res) => {
  const board = await Board.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!board) {
    return res.status(404).json({ message: 'Board not found.' });
  }

  await Task.deleteMany({ board: board._id, owner: req.user._id });

  return res.status(200).json({ message: 'Board and tasks deleted successfully.', data: { boardId: board._id } });
};
