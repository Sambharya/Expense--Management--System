const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const path = require('path');

// Config dot env file
dotenv.config();

// Database call
connectDb();

// Rest object
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Port
const PORT = process.env.PORT || 8080;

// Listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
