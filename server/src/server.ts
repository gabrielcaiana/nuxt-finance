import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import { Transaction, Categorie, Account } from './interfaces';

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
  const { categoriesId } = req.body;

  const result = await prisma.categories.findUnique({
    where: {
      id: id || categoriesId,
    },
  });

  if (!result) {
    return res.status(400).send({ error: 'Categorie not found!' });
  }

  req.id = id;
  return next();
}

async function verifyIfExistsAccount(req, res, next) {
  const { accountCpf } = req.body;
  const { cpf } = req.params;

  const result = await prisma.account.findUnique({
    where: {
      cpf: accountCpf || cpf,
    },
  });

  if (!result) {
    return res.status(400).send({ error: 'Account not found!' });
  }

  req.cpf = result.cpf;
  return next();
}

// transactions
app.get('/transactions', async (req, res) => {
  const transactions = await prisma.transactions.findMany({
    select: {
      id: true,
      description: true,
      amount: true,
      date: true,
      categories: true,
      type: true,
      Account: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return res.json(transactions);
});

app.post(
  '/transactions',
  verifyIfExistsCategorie,
  verifyIfExistsAccount,
  async (req, res) => {
    const body = req.body;

    const transaction: Transaction = await prisma.transactions.create({
      data: {
        description: body.description,
        amount: body.amount,
        type: body.type,
        date: new Date(body.date),
        categoriesId: body.categoriesId,
        accountCpf: body.accountCpf,
      },
    });

    return res.status(200).json(transaction);
  }
);

app.put(
  '/transactions/:id',
  verifyIfExistsCategorie,
  verifyIfExistsAccount,
  async (req, res) => {
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
  }
);

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

// categories
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

app.put('/categories/:id', verifyIfExistsCategorie, async (req: any, res) => {
  const { id } = req;
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

// account
app.get('/account', async (req, res) => {
  const account = await prisma.account.findMany({
    select: {
      name: true,
      email: true,
      cpf: true,
      transactions: true,
    },
  });

  return res.json(account);
});

app.post('/account', async (req: any, res) => {
  const body = req.body;

  const accountExists = await prisma.account.findUnique({
    where: {
      cpf: body.cpf,
    },
  });

  if (accountExists) {
    return res.status(400).send({ error: 'Account already exists!' });
  }

  const account: Account = await prisma.account.create({
    data: {
      cpf: body.cpf,
      email: body.email,
      name: body.name,
    },
  });

  return res.status(200).json(account);
});

app.delete('/account/:cpf', verifyIfExistsAccount, async (req: any, res) => {
  const { cpf } = req;

  await prisma.account.delete({
    where: {
      cpf: cpf,
    },
  });

  await prisma.transactions.deleteMany({
    where: {
      accountCpf: cpf,
    },
  });

  return res.send(200);
});

app.listen('3333');
