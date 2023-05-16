const express = require("express");
const cors = require("cors");
// const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");
// const __dirname = path.resolve();

// Deployment configuration
//configure env file in dev mode
dotenv.config();

// configure env file in production
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: "./config.env" });
}

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "*",
  })
);

// API routes
app.use("/api/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
    // .yellow.bold
  )
);
