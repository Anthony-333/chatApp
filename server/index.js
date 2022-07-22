// import module
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//Route import
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import MessageRoute from "./Routes/MessageRoute.js";

dotenv.config(); // dotenv config
const MONGO_DB = process.env.MONGO_DB;
const PORT = process.env.PORT || 5000;

//Middleware
const app = express(); // initialize express
app.use(bodyParser.json({ limit: "30mb", extended: true })); //set the json file to 30mb limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(cors());
//MongoDB Connection and Port
mongoose
  .connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`listening to Port: ${PORT}`)))
  .catch((error) => console.log(error));

// Route Usage
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute)
