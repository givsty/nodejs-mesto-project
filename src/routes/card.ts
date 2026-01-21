import { Router } from 'express';
import {
  getCard, createCard, deleteCard, likeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCard);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:cardId/likes', likeCard);

export default router;
