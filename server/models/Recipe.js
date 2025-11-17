import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  ingredientes: [{ type: String, required: true }],
  instrucoes: [{ type: String, required: true }],
  tempoPreparo: { type: Number, default: 0 },
  porcoes: { type: Number, default: 1 },
  imagem: { type: String },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Recipe', recipeSchema);
