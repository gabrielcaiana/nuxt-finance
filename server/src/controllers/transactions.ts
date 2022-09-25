import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

import { Transaction } from '../interfaces';

export default {
  async index(req, res) {
    const transactions = await prisma.transactions.findMany({
      select: {
        id: true,
        description: true,
        amount: true,
        date: true,
        categoriesId: true,
        categories: {
          select: {
            name: true,
          },
        },
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
  },

  async create(req, res) {
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
  },

  async update(req, res) {
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
  },

  async delete(req, res) {
    const { id } = req;

    await prisma.transactions.delete({
      where: {
        id: id,
      },
    });

    return res.send(200);
  },
};
