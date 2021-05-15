import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import React from "react";
import axios from "axios";
import {Router, Switch} from "react-router-dom";
import useStyles from "../src/styles/App";

function App() {

  const classes = useStyles();

  const getUser = async() => {
    const response = await axios.get(`http://localhost:5000/user`);
    console.log(response.data.user)
    return response.data.user;
  }

  return (
    <div className={classes.app}>
      <MainPage/>
    </div>
  );
}

export default App;
