import Comment from '../models/Comment.js';

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.recipeId }).populate('autor', 'nome');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { comentario } = req.body;

    // Validation
    if (!comentario || comentario.trim().length === 0) {
      return res.status(400).json({ message: 'Comentário não pode estar vazio' });
    }

    const comment = await Comment.create({
      comentario,
      autor: req.user._id,
      recipeId: req.params.recipeId
    });
    await comment.populate('autor', 'nome');

    // Emit to all clients via Socket.io
    const io = req.app.get('io');
    io.emit('newComment', comment);

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comentário não encontrado' });

    // Allow admin to delete any comment, or author to delete their own
    if (req.user.role !== 'admin' && comment.autor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comentário deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
