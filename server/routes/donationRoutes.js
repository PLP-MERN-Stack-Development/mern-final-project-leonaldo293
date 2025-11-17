import express from 'express';
import {
  createDonation,
  getAllDonations,
  getDonationById,
  getUserDonations,
  updateDonation,
  deleteDonation,
  reserveDonation,
  cancelReservation,
  markAsCollected
} from '../controllers/donationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Rotas para doações
router.post('/', createDonation);
router.get('/', getAllDonations);
router.get('/user', getUserDonations);
router.get('/:id', getDonationById);
router.put('/:id', updateDonation);
router.delete('/:id', deleteDonation);

// Rotas específicas para reserva e coleta
router.post('/:id/reserve', reserveDonation);
router.post('/:id/cancel-reservation', cancelReservation);
router.post('/:id/collect', markAsCollected);

export default router;
