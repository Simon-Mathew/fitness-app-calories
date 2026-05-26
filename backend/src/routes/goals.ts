import { Router } from 'express';
import {
  getGoals,
  getGoalById,
  createGoal,
  updateGoalProgress,
  deleteGoal,
} from '../controllers/goalController';

const router = Router();

router.route('/')
  .get(getGoals)
  .post(createGoal);

router.route('/:id')
  .get(getGoalById)
  .patch(updateGoalProgress)
  .delete(deleteGoal);

export default router;
