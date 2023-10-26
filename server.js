require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./db/dbConfig");
const errorHandler = require("./middlewares/errorHandler");
const authRoute = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

app.use("/api", authRoute);

app.use(errorHandler);

const port = 5001;

const start = () => {
  console.log(`Server is running`.yellow.underline);
};

app.listen(port, start);
