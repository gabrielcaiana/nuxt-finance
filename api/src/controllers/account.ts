import { PrismaClient } from '@prisma/client'

import { Account } from '../interfaces'
import { getBalance } from '../services/calculateBalance'

const prisma = new PrismaClient({
  log: ['query'],
})

export default {
  async index(_req, res) {
    const account = await prisma.account.findMany({
      select: {
        name: true,
        email: true,
        cpf: true,
        transactions: true,
      },
    })

    return res.json(account)
  },

  async indexByDocument(req, res) {
    const { cpf } = req.params
    const account = await prisma.account.findUnique({
      where: {
        cpf,
      },
      select: {
        name: true,
        email: true,
        cpf: true,
        transactions: {
          select: {
            amount: true,
            categories: true,
            id: true,
            type: true,
            description: true,
          },
        },
      },
    })

    const { balance, deposit, expense } = await getBalance(
      account?.transactions
    )

    return res.json({
      ...account,
      balance,
      deposit,
      expense,
    })
  },

  async create(req, res) {
    const body = req.body

    const accountExists = await prisma.account.findUnique({
      where: {
        cpf: body.cpf,
      },
    })

    if (accountExists) {
      return res.status(400).send({ error: 'Account already exists!' })
    }

    const account: Account = await prisma.account.create({
      data: {
        cpf: body.cpf,
        email: body.email,
        name: body.name,
      },
    })

    return res.status(200).json(account)
  },

  async delete(req, res) {
    const { cpf } = req

    await prisma.account.delete({
      where: {
        cpf,
      },
    })

    await prisma.transactions.deleteMany({
      where: {
        accountCpf: cpf,
      },
    })

    return res.send(200)
  },
}
