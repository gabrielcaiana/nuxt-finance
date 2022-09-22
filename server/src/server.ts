import express from 'express';
import cors from 'cors';

const transactions = require('./mocks/transactions');
const categories = require('./mocks/categories');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/transactions', (req, res) => {
  return res.json(transactions);
});

app.get('/categories', (req, res) => {
  return res.json(categories);
});

app.listen('3333');
