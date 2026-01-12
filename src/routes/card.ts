import { Router } from 'express';
import { getCard } from '../controllers/cards';

const router = Router();

router.get('/', getCard);

// router.post('/', (req, res) => {});

// router.delete('/:cardId', (req, res) => {});

// router.put('/:cardId/likes', (req, res) => {});
// router.delete('/:cardId/likes', (req, res) => {});

export default router;
