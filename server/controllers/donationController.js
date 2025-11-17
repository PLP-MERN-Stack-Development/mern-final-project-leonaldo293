import Donation from '../models/Donation.js';
import User from '../models/User.js';

// Criar nova doação
export const createDonation = async (req, res) => {
  try {
    const { titulo, categoria, quantidade, dataValidade, localizacao, coordenadas, imagem, descricao } = req.body;

    // Validações
    if (!titulo || !categoria || !quantidade || !dataValidade || !localizacao || !coordenadas) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    if (new Date(dataValidade) <= new Date()) {
      return res.status(400).json({ message: 'A data de validade deve ser futura' });
    }

    const donation = new Donation({
      titulo,
      categoria,
      quantidade,
      dataValidade,
      localizacao,
      coordenadas,
      imagem,
      descricao,
      doador: req.user.id
    });

    await donation.save();

    // Populate doador
    await donation.populate('doador', 'nome');

    res.status(201).json(donation);
  } catch (error) {
    console.error('Erro ao criar doação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Buscar todas as doações
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('doador', 'nome')
      .populate('reservadoPor', 'nome')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Erro ao buscar doações:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Buscar doação por ID
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('doador', 'nome email')
      .populate('reservadoPor', 'nome email');

    if (!donation) {
      return res.status(404).json({ message: 'Doação não encontrada' });
    }

    res.json(donation);
  } catch (error) {
    console.error('Erro ao buscar doação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Buscar doações do usuário logado
export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ doador: req.user.id })
      .populate('reservadoPor', 'nome')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Erro ao buscar doações do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Atualizar doação (apenas dono)
export const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Doação não encontrada' });
    }

    // Verificar se é o dono da doação
    if (donation.doador.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado. Você só pode editar suas próprias doações' });
    }

    // Não permitir editar se já foi coletada
    if (donation.status === 'coletado') {
      return res.status(400).json({ message: 'Não é possível editar uma doação já coletada' });
    }

    const { titulo, categoria, quantidade, dataValidade, localizacao, coordenadas, imagem, descricao } = req.body;

    if (dataValidade && new Date(dataValidade) <= new Date()) {
      return res.status(400).json({ message: 'A data de validade deve ser futura' });
    }

    donation.titulo = titulo || donation.titulo;
    donation.categoria = categoria || donation.categoria;
    donation.quantidade = quantidade || donation.quantidade;
    donation.dataValidade = dataValidade || donation.dataValidade;
    donation.localizacao = localizacao || donation.localizacao;
    donation.coordenadas = coordenadas || donation.coordenadas;
    donation.imagem = imagem || donation.imagem;
    donation.descricao = descricao || donation.descricao;

    await donation.save();
    await donation.populate('doador', 'nome');
    await donation.populate('reservadoPor', 'nome');

    res.json(donation);
  } catch (error) {
    console.error('Erro ao atualizar doação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Deletar doação (apenas dono)
export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Doação não encontrada' });
    }

    // Verificar se é o dono da doação
    if (donation.doador.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado. Você só pode deletar suas próprias doações' });
    }

    // Não permitir deletar se já foi coletada
    if (donation.status === 'coletado') {
      return res.status(400).json({ message: 'Não é possível deletar uma doação já coletada' });
    }

    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doação deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar doação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Reservar doação
export const reserveDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Doação não encontrada' });
    }

    if (donation.status !== 'disponivel') {
      return res.status(400).json({ message: 'Esta doação não está disponível para reserva' });
    }

    // Não permitir que o doador reserve sua própria doação
    if (donation.doador.toString() === req.user.id) {
      return res.status(400).json({ message: 'Você não pode reservar sua própria doação' });
    }

    donation.status = 'reservado';
    donation.reservadoPor = req.user.id;

    await donation.save();
    await donation.populate('doador', 'nome');
    await donation.populate('reservadoPor', 'nome');

    res.json(donation);
  } catch (error) {
    console.error('Erro ao reservar doação:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Cancelar reserva (apenas quem reservou)
export const cancelReservation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Doação não encontrada' });
    }

    if (donation.status !== 'reservado') {
      return res.status(400).json({ message: 'Esta doação não está reservada' });
    }

    // Verificar se é quem reservou ou o doador
    if (donation.reservadoPor.toString() !== req.user.id && donation.doador.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    donation.status = 'disponivel';
    donation.reservadoPor = null;

    await donation.save();
    await donation.populate('doador', 'nome');

    res.json(donation);
  } catch (error) {
    console.error('Erro ao cancelar reserva:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Marcar como coletada (apenas doador)
export const markAsCollected = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Doação não encontrada' });
    }

    // Verificar se é o doador
    if (donation.doador.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acesso negado. Apenas o doador pode marcar como coletada' });
    }

    if (donation.status !== 'reservado') {
      return res.status(400).json({ message: 'A doação deve estar reservada para ser marcada como coletada' });
    }

    donation.status = 'coletado';

    await donation.save();
    await donation.populate('doador', 'nome');
    await donation.populate('reservadoPor', 'nome');

    res.json(donation);
  } catch (error) {
    console.error('Erro ao marcar doação como coletada:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
