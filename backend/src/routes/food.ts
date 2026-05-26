import { Router } from 'express';
import {
  getFoodByDate,
  createFoodEntry,
  updateFoodEntry,
  deleteFoodEntry,
  getDailySummary,
} from '../controllers/foodController';

const router = Router();

router.get('/summary', getDailySummary);

router.route('/')
  .get(getFoodByDate)
  .post(createFoodEntry);

router.route('/:id')
  .put(updateFoodEntry)
  .delete(deleteFoodEntry);

export default router;
