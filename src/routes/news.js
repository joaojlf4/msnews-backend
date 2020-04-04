import { Router } from 'express';
import newController from '../controllers/newController';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get('/', newController.index);
router.post('/', authMiddleware, newController.store);
router.put('/:id', authMiddleware, newController.update);
router.delete('/:id', authMiddleware, newController.delete);

export default router;