import { PrismaClient } from '@prisma/client'

import { getBalance } from '../services/calculateBalance'

const prisma = new PrismaClient({
  log: ['query'],
})

export default {
  async index(req, res) {
    const { cpf } = req.params

    const account = await prisma.account.findUnique({
      where: {
        cpf,
      },

      select: {
        name: true,
        email: true,
        cpf: true,
        Balance: {
          select: {
            balance: true,
            deposit: true,
            expense: true,
          },
        },
        transactions: true,
      },
    })

    return res.status(200).json(account)
  },

  async create(req, res) {
    const { cpf } = req.params

    // refactor to middleware
    const findAccountBalance = await prisma.balance.findUnique({
      where: {
        accountCpf: cpf,
      },
    })

    if (findAccountBalance) {
      return res.status(400).send({ error: 'Balance already exists!' })
    }

    const account = await prisma.account.findUnique({
      where: {
        cpf,
      },
      select: {
        transactions: true,
        cpf: true,
        email: true,
      },
    })

    const { balance, deposit, expense } = await getBalance(
      account?.transactions
    )
    const result = await prisma.balance.create({
      data: {
        balance,
        deposit,
        expense,
        accountCpf: cpf,
      },
      select: {
        balance: true,
        deposit: true,
        expense: true,
      },
    })

    return res.status(200).json(result)
  },

  async delete(req, res) {
    const { cpf } = req.params

    await prisma.balance.delete({
      where: {
        accountCpf: cpf,
      },
    })

    return res.status(200)
  },
}
