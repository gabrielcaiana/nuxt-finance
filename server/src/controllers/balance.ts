import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

const getBalance = (statement) => {
  if (!statement.transaction) {
    const balance = 0.0;
    return balance;
  }

  const balance = statement.reduce((acc, operation) => {
    operation.type === 'deposit'
      ? acc + operation.amount
      : acc - operation.amount;
  }, 0);

  return balance;
};

const getDeposit = (statement) => {
  const deposits = statement.filter((deposit) => deposit.type === 'deposit');
  const calculateDeposit = deposits.reduce((acc, operation) => {
    return acc + operation.amount;
  }, 0);
  return calculateDeposit;
};

const getExpense = (statement) => {
  const expenses = statement.filter((deposit) => deposit.type === 'expense');
  const calculateExpenses = expenses.reduce((acc, operation) => {
    return acc + operation.amount;
  }, 0);
  return calculateExpenses;
};

export default {
  async index(req, res) {
    const { cpf } = req.params;

    const account = await prisma.account.findUnique({
      where: {
        cpf: cpf,
      },

      select: {
        name: true,
        email: true,
        cpf: true,
        Balance: true,
        transactions: true,
      },
    });

    return res.status(200).json(account);
  },

  async create(req, res) {
    const { cpf } = req.params;

    // refactor to middleware
    const findAccountBalance = await prisma.balance.findUnique({
      where: {
        accountCpf: cpf,
      },
    });

    if (findAccountBalance) {
      return res.status(400).send({ error: 'Balance already exists!' });
    }

    const account = await prisma.account.findUnique({
      where: {
        cpf: cpf,
      },
      select: {
        transactions: true,
        cpf: true,
        email: true,
      },
    });

    // if (!account?.transactions.length) {
    //   return res
    //     .status(400)
    //     .send({ error: 'There must be at least one transaction!' });
    // }

    const balance = await getBalance(account?.transactions);
    const deposit = await getDeposit(account?.transactions);
    const expense = await getExpense(account?.transactions);

    const result = await prisma.balance.create({
      data: {
        balance,
        deposit,
        expense,
        accountCpf: cpf,
      },
    });

    return res.status(200).json({
      result,
    });
  },

  async delete(req, res) {
    const { cpf } = req.params;

    await prisma.balance.delete({
      where: {
        accountCpf: cpf,
      },
    });

    return res.status(200);
  },
};
