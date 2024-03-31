import express from 'express';
import { getData, getTransactions, getStatistics, getBarChart, getPieChart, getCombinedData } from '../controllers/getData.controller';

const router = express.Router();

router.route('/data').get(getData);
router.route('/transactions').get(getTransactions);
router.route('/statistics').get(getStatistics);
router.route('/bar-chart').get(getBarChart);
router.route('/pie-chart').get(getPieChart);
router.route('/combined-data').get(getCombinedData);



export default router;