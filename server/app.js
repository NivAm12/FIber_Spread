import express from "express";
import {addressSearch} from "./routes/addressSearch.js";
//const user = require('./routes/user');
import cors from "cors";
import mongoose from "mongoose";
const {connect, connection} = mongoose;

// DB CONNECTION
const connectToDb = () => {
  connect("mongodb://localhost:27017/fiberSpread", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const db = connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => {
    console.log("Database connected");
  });
};


// set the app:
const app = express();
connectToDb();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

// app settings:
app.use(express.json());
app.use(cors({origin: 'localhost:5000', credentials:true }));

// routes:
app.use('/search', addressSearch);

