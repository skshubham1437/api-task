const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/inventoryController");

/**
 * @swagger
 * /experience/{id}/slots:
 *   get:
 *     summary: Get available slots for a given product ID and date
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 14
 *         description: Product ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-04-01"
 *     responses:
 *       200:
 *         description: Successful response with available slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Slot'
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: No slots available for the given date
 */
router.get("/:id/slots", experienceController.getSlots);


/**
 * @swagger
 * /experience/{id}/dates:
 *   get:
 *     summary: Get available dates for a given product ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Successful response with available dates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dates:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DateAvailability'
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: No available dates for the given product ID
 */
router.get("/:id/dates", experienceController.getAvailableDates);

module.exports = router;
