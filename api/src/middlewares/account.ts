import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const verifyIfExistsAccount = async (req, res, next) => {
  const { accountCpf } = req.body
  const { cpf } = req.params

  const result = await prisma.account.findUnique({
    where: {
      cpf: accountCpf || cpf,
    },
  })

  if (!result) {
    return res.status(400).send({ error: 'Account not found!' })
  }

  req.cpf = result.cpf
  return next()
}
