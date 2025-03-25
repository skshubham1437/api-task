const axios = require('axios');
const prisma = require('../database/prismaClient');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://leap-api.tickete.co/api/v1/inventory';
const PRODUCTS = [
  { id: 14, name: "Product 14", availableDays: ["Monday", "Tuesday", "Wednesday"] },
  { id: 15, name: "Product 15", availableDays: ["Sunday"] }
];

const fetchInventory = async (productId, date) => {
    try {
        const response = await axios.get(
            `https://leap-api.tickete.co/api/v1/inventory/${productId}?date=${date}`,
            {
                headers: {
                    "x-api-key": process.env.API_KEY, // Ensure API_KEY is set in .env
                },
            }
        );

        console.log("Inventory Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory:", error.response?.data || error.message);
    }
};

const syncInventory = async () => {
  const today = new Date();
  const nextTwoMonths = new Date();
  nextTwoMonths.setMonth(today.getMonth() + 2);

  for (const product of PRODUCTS) {
    let currentDate = new Date(today);
    while (currentDate <= nextTwoMonths) {
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

      if (product.availableDays.includes(dayName)) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        const inventory = await fetchInventory(product.id, formattedDate);

        if (inventory) {
          for (const slot of inventory.slots) {
            await prisma.slot.upsert({
              where: { startTime_startDate_productId: { 
                startTime: slot.startTime, 
                startDate: new Date(slot.startDate), 
                productId: product.id 
              }},
              update: { remaining: slot.remaining, price: slot.price },
              create: {
                productId: product.id,
                startTime: slot.startTime,
                startDate: new Date(slot.startDate),
                remaining: slot.remaining,
                price: slot.price,
                paxAvailability: slot.paxAvailability,
              },
            });
          }
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
};

module.exports = { syncInventory };
