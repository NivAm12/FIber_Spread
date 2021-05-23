import express from "express";
import {addressSearch} from "./routes/addressSearch.js";
import {userAuth} from "./routes/userAuth.js";
import {User} from "./models/user.js";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import localStrategy from "passport-local"
const {connect, connection} = mongoose;
import { config} from "dotenv";


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
config()
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

// app settings:
app.use(express.json());
app.use(cors({origin: 'localhost:5000', credentials:true }));

//session configuartion
const secret = process.env.SECRET || 'thisshouldbeabettersecret';

app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 1000 * 60 * 60 * 24 * 3,
  }
}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes:
app.use('/search', addressSearch);
app.use('/', userAuth);

