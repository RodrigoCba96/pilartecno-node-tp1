import { Router } from "express";
import {
    getAllStars,
    createStar,
    getStarById
} from '../controllers/starsController.js';

const router = Router();

router.get('/stars', getAllStars);

router.get('/stars/:id', getStarById)

router.post('/stars', createStar)

export default router;


 