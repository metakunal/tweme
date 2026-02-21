import express from 'express';
import { generateGifReactions } from '../controllers/gif.controller.js';

const router = express.Router();

router.post('/generate-gif', generateGifReactions);

export default router;
