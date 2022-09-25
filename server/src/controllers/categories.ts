import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

import { Categorie } from '../interfaces';

export default {
  async index(req, res) {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
        _count: true,
      },
    });

    return res.json(categories);
  },

  async create(req, res) {
    const body: Categorie = req.body;
    const cateogie = await prisma.categories.create({
      data: {
        name: body.name,
      },
    });

    return res.status(200).json(cateogie);
  },

  async update(req: any, res) {
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
  },

  async delete(req: any, res) {
    const { id } = req;

    await prisma.categories.delete({
      where: {
        id: id,
      },
    });

    return res.send(200);
  },
};
