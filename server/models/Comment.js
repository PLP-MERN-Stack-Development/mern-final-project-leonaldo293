import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comentario: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema);
