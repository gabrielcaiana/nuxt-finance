import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyIfExistsCategorie = async (req, res, next) => {
  const { id } = req.params;
  const { categoriesId } = req.body;

  const result = await prisma.categories.findUnique({
    where: {
      id: categoriesId || id,
    },
  });

  if (!result) {
    return res.status(400).send({ error: 'Categorie not found!' });
  }

  req.id = result.id;
  return next();
};
