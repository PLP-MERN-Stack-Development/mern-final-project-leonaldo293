import User from '../models/User.js';
import Donation from '../models/Donation.js';
import Comment from '../models/Comment.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  try {
    const { nome, email, password, tipo } = req.body;

    // Validation
    if (!nome || !email || !password || !tipo) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if (!['doador', 'receptor'].includes(tipo)) {
      return res.status(400).json({ message: 'Tipo deve ser doador ou receptor' });
    }

    const userExists = await User.findOne({ email });
    if(userExists) return res.status(400).json({ message: 'Usuário já existe' });

    const user = await User.create({ nome, email, password, tipo });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Credenciais inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin functions
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Role deve ser user ou admin' });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { nome, email, tipo, avatar } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar se email já existe (se foi alterado)
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }
    }

    user.nome = nome || user.nome;
    user.email = email || user.email;
    user.tipo = tipo || user.tipo;
    user.avatar = avatar || user.avatar;

    await user.save();

    const updatedUser = await User.findById(userId).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se usuário existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Não permitir deletar admin (exceto se for outro admin)
    if (user.role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Não é possível deletar administradores' });
    }

    // Deletar doações do usuário
    await Donation.deleteMany({ doador: id });

    // Deletar comentários do usuário
    await Comment.deleteMany({ autor: id });

    // Deletar o usuário
    await User.findByIdAndDelete(id);

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
