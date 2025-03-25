const prisma = require('../database/prismaClient');

const getSlots = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  const slots = await prisma.slot.findMany({
    where: { productId: parseInt(id), startDate: new Date(date) },
    select: { startTime: true, startDate: true, price: true, remaining: true, paxAvailability: true }
  });

  return res.json(slots);
};

const getAvailableDates = async (req, res) => {
  const { id } = req.params;

  const dates = await prisma.slot.findMany({
    where: { productId: parseInt(id) },
    distinct: ['startDate'],
    select: { startDate: true, price: true }
  });

  return res.json({ dates });
};

module.exports = { getSlots, getAvailableDates };
