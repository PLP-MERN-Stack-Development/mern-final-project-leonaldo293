import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  categoria: {
    type: String,
    enum: ['frutas', 'vegetais', 'graos', 'laticinios', 'proteinas', 'padaria', 'outros'],
    required: true
  },
  quantidade: { type: String, required: true },
  dataValidade: { type: Date, required: true },
  localizacao: { type: String, required: true },
  coordenadas: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  imagem: { type: String },
  descricao: { type: String },
  status: {
    type: String,
    enum: ['disponivel', 'reservado', 'coletado'],
    default: 'disponivel'
  },
  reservadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Donation', donationSchema);
