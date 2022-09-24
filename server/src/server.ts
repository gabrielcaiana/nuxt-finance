import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import { Transaction } from './interfaces/Transaction';
import { Categorie } from './interfaces/Categorie';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query'],
});

// middlewares
async function verifyIfExistsTransaction(req, res, next) {
  const { id } = req.params;

  const result = await prisma.transactions.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    return res.status(400).send({ error: 'Transaction not found!' });
  }

  req.id = id;
  return next();
}

async function verifyIfExistsCategorie(req, res, next) {
  const { id } = req.params;

  const result = await prisma.categories.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    return res.status(400).send({ error: 'Categorie not found!' });
  }

  req.id = id;
  return next();
}

app.get('/transactions', async (req, res) => {
  const transactions = await prisma.transactions.findMany({
    select: {
      id: true,
      description: true,
      amount: true,
      date: true,
      categories: true,
    },
  });

  return res.json(transactions);
});

app.post('/transactions', async (req, res) => {
  const body: Transaction = req.body;
  const transaction = await prisma.transactions.create({
    data: {
      description: body.description,
      amount: body.amount,
      date: new Date(body.date),
      categoriesId: body.categoriesId,
    },
  });

  return res.status(200).json(transaction);
});

app.put('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const body: Transaction = req.body;
  const updateTransaction: any = await prisma.transactions.update({
    where: {
      id: id,
    },

    data: {
      ...body,
      date: new Date(body.date),
    },
  });

  return res.status(200).json(updateTransaction);
});

app.delete(
  '/transactions/:id',
  verifyIfExistsTransaction,
  async (req: any, res) => {
    const { id } = req;

    await prisma.transactions.delete({
      where: {
        id: id,
      },
    });

    return res.send(200);
  }
);

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

app.post('/categories', async (req, res) => {
  const body: Categorie = req.body;
  const cateogie = await prisma.categories.create({
    data: {
      name: body.name,
    },
  });

  return res.status(200).json(cateogie);
});

app.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const body: Categorie = req.body;
  const updateCategorie = await prisma.categories.update({
    where: {
      id: id,
    },

    data: {
      ...body,
    },
  });

  return res.status(200).json(updateCategorie);
});

app.delete(
  '/categories/:id',
  verifyIfExistsCategorie,
  async (req: any, res) => {
    const { id } = req;

    await prisma.categories.delete({
      where: {
        id: id,
      },
    });

    return res.send(200);
  }
);

app.listen('3333');
