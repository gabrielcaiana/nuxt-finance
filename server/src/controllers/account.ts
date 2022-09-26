import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

import { Account } from '../interfaces';

export default {
  async index(req, res) {
    const account = await prisma.account.findMany({
      select: {
        name: true,
        email: true,
        cpf: true,
        transactions: true,
        Balance: true,
      },
    });
    return res.json(account);
  },

  async indexByDocument(req, res) {
    const { cpf } = req.params;
    const account = await prisma.account.findUnique({
      where: {
        cpf: cpf,
      },
      select: {
        name: true,
        email: true,
        cpf: true,
        transactions: true,
        Balance: true,
      },
    });

    return res.json(account);
  },

  async create(req, res) {
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
  },

  async delete(req, res) {
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
  },
};
