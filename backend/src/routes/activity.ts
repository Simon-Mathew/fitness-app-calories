import { Router } from 'express';
import {
  getActivity,
  getTodayActivity,
  logActivity,
  getWeeklySummary,
} from '../controllers/activityController';

const router = Router();

router.get('/today', getTodayActivity);
router.get('/summary', getWeeklySummary);

router.route('/')
  .get(getActivity)
  .post(logActivity);

export default router;
