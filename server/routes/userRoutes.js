import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUserRole, updateUserProfile, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Profile routes
router.put('/profile', authMiddleware, updateUserProfile);

// Admin routes
router.get('/admin/users', authMiddleware, isAdmin, getAllUsers);
router.put('/admin/users/:id/role', authMiddleware, isAdmin, updateUserRole);
router.delete('/admin/users/:id', authMiddleware, isAdmin, deleteUser);

export default router;
