import express from 'express';
import { getData, getTransactions, getStatistics, getBarChart, getPieChart, getCombinedData } from './controllers/getData.controller.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/data', getData);
app.get('/transactions', getTransactions);
app.get('/statistics', getStatistics);
app.get('/bar-chart', getBarChart);
app.get('/pie-chart', getPieChart);
app.get('/combined-data', getCombinedData);


export { app };