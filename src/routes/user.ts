import { Router } from 'express';
import {
  createUser, getUsers, findUserById, updateAvatar,
  updateUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me', updateUser);
router.get('/:id', findUserById);
router.patch('/me/avatar', updateAvatar);

export default router;
