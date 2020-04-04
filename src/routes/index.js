import { Router } from 'express';
import news from './news';
import users from './users';
const router = Router();

router.use('/news', news);
router.use('/users', users);

export default router;