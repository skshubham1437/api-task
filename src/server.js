const express = require("express");
const setupSwagger = require("./config/swaggerConfig");
const experienceRoutes = require("./routes/experienceRoutes");

const app = express();

app.use(express.json());

// Setup Swagger
setupSwagger(app);

app.use("/api/v1/experience", experienceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
