import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query'],
});

app.get('/transactions', async (req, res) => {
  const transactions = await prisma.transactions.findMany({
    select: {
      id: true,
      description: true,
      date: true,
      categoriesId: true,
    },
  });

  return res.json(transactions);
});

app.get('/categories', async (req, res) => {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      _count: true,
    },
  });

  return res.json(categories);
});

app.listen('3333');
