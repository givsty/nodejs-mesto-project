import { Router } from 'express';
import { createUser, getUsers } from '../controllers/users';
// допишите код здесь

const router = Router();
// допишите код здесь
router.get('/', getUsers);
router.post('/', createUser);
// router.get('/:id', () => getUser);
// router.post('/', postUsers);

// router.patch('/me', (req, res) => {});

// router.patch("/users/me/avatar", (req, res) => {});

export default router;
