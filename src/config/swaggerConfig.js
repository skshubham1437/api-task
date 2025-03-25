const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Inventory Management API",
        version: "1.0.0",
        description: "API documentation for the inventory system",
      },
      servers: [
        {
          url: `${process.env.BASEURL}/api/v1`,
          description: "Local Development Server",
        },
      ],
      components: {
        schemas: {
          Price: {
            type: "object",
            properties: {
              finalPrice: { type: "number" },
              currencyCode: { type: "string" },
              originalPrice: { type: "number" },
            },
          },
          PaxAvailability: {
            type: "object",
            properties: {
              type: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              price: { $ref: "#/components/schemas/Price" },
              min: { type: "integer" },
              max: { type: "integer" },
              remaining: { type: "integer" },
            },
          },
          Slot: {
            type: "object",
            properties: {
              startTime: { type: "string" },
              startDate: { type: "string" },
              price: { $ref: "#/components/schemas/Price" },
              remaining: { type: "integer" },
              paxAvailability: {
                type: "array",
                items: { $ref: "#/components/schemas/PaxAvailability" },
              },
            },
          },
          DateAvailability: {
            type: "object",
            properties: {
              date: { type: "string", format: "date" },
              price: { $ref: "#/components/schemas/Price" },
            },
          },
        },
      },
    },
    apis: ["./src/routes/*.js"], // Include all route files
  };  

const swaggerDocs = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log(`Swagger Docs available at: ${process.env.BASEURL}/api-docs`);
};

module.exports = setupSwagger;
