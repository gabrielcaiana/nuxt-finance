import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyIfExistsTransaction = async (req, res, next) => {
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
};
