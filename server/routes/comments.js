import express from 'express';
import { getComments, createComment, deleteComment } from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/:recipeId', getComments);
router.post('/:recipeId', authMiddleware, createComment);
router.delete('/:commentId', authMiddleware, deleteComment);

export default router;
