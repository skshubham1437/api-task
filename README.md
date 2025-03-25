# Inventory Management API Integration

This project demonstrates an API integration with a partner's inventory service. It is built using **Node.js**, **Express.js**, and **Prisma ORM** with a SQL database, and uses **cron jobs** for periodic syncing of inventory data. Swagger is integrated for API documentation.

## Overview

The API integration fetches inventory data from the partner's endpoint and stores it in a normalized SQL database. The inventory is refreshed periodically according to the following schedule:

- **Every day**: Fetch availability for the next 30 days.
- **Every 4 hours**: Fetch availability for the next 7 days.
- **Every 15 minutes**: Fetch today's availability.

The system exposes two GET endpoints:
- **Slots API**: `/api/v1/experience/:id/slots?date=<date>`
- **Dates API**: `/api/v1/experience/:id/dates`

## Project Structure

├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── swaggerConfig.js
│   ├── controllers/
│   │   └── inventoryController.js
│   ├── database/
│   │   └── prismaClient.js
│   ├── middlewares/
│   │   └── rateLimiter.js
│   ├── routes/
│   │   └── inventoryRoutes.js
│   ├── services/
│   │   └── inventoryService.js
│   ├── utils/
│   │   └── scheduler.js
│   └── server.js
├── .env
├── package.json
├── setup.sh
└── README.md

## Setup & Installation

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd api-integration
   ```

2. **Run the setup script to create the project structure and install dependencies:**

   ```sh
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Install any remaining dependencies:**

   ```sh
   npm install
   ```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```dotenv
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
API_KEY=<your-api-key>
PORT=5000
```

> **Note:** If using SQLite for development, update the `DATABASE_URL` accordingly in the `prisma/schema.prisma` file.

## Database Migration

Run the following command to create your database tables using Prisma:

```sh
npx prisma migrate dev --name init
```

## Running the Application

Start the server using Node.js:

```sh
node src/server.js
```

For development with auto-reload, you can use:

```sh
nodemon src/server.js
```

## Endpoints

### Slots API

- **URL:** `/api/v1/experience/:id/slots`
- **Method:** `GET`
- **Query Parameters:**
  - `date` (YYYY-MM-DD): Date for which inventory is requested.
- **Description:** Returns available time slots for a given product ID and date.

### Dates API

- **URL:** `/api/v1/experience/:id/dates`
- **Method:** `GET`
- **Description:** Returns all available dates for the next two months for the given product ID.

## Swagger Documentation

Swagger documentation is available to explore the API endpoints:

- **URL:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

If you notice the `id` path parameter appears disabled, ensure you click the **Try it out** button. If the field remains uneditable, try removing any example or default value from the parameter definition, clear your browser cache, or test in another browser.

## Cron Jobs & Rate Limiting

The application uses `node-cron` to periodically fetch inventory data from the partner API:
- **Every day:** Sync data for the next 30 days.
- **Every 4 hours:** Sync data for the next 7 days.
- **Every 15 minutes:** Sync today's data.

> **Rate Limiting:**  
> The partner API has a rate limit of 30 requests per minute. Although the current solution works with two products, for a large-scale system (up to 450 products), a dedicated rate limiting strategy (e.g., middleware or queuing system) should be implemented to ensure the limit is not breached.

## Further Improvements

- **Explicit Rate Limiting:**  
  Implement a middleware or a queuing mechanism to enforce the 30 requests per minute limit more robustly.
- **Pause/Resume Sync Endpoints:**  
  Consider exposing endpoints to pause or resume the inventory sync process.
- **Optimizations:**  
  Optimize database queries and data fetching logic to scale effectively with thousands of products.
- **Enhanced Logging:**  
  Integrate a robust logging system (e.g., Winston or Bunyan) for better error monitoring and diagnostics.

## Deployment

This project can be deployed on platforms such as [Render](https://render.com/) or [Vercel](https://vercel.com/). Ensure that your environment variables (`DATABASE_URL`, `API_KEY`, etc.) are correctly configured on your deployment platform.

## License

This project is licensed under the [MIT License](LICENSE).

