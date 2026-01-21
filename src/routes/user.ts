import { Router } from 'express';
import { getUsers, postUsers } from '../controllers/users';
// допишите код здесь

const router = Router();
// допишите код здесь
router.get('/', getUsers);

router.post('/', postUsers);

// router.put(":userId", (req, res) => {
// });

// router.patch("/users/me", (req, res) => {});

// router.patch("/users/me/avatar", (req, res) => {});

export default router;
