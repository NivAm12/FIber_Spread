import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Switch, Route, Redirect } from 'react-router-dom';
import useStyles from "../styles/App";
import '../styles/App.css';

function App() {

  const classes = useStyles();

  const getUser = async() => {
    const response = await axios.get(`http://localhost:5000/user`);
    return response.data.user;
  }

  return (
    <div className={classes.app}>
      <Switch>
        <Route exact path='/'
          render={(props) => getUser()
            ? <MainPage {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
        <Route exact path='/login' render={(props) => (<LoginPage {...props}/>)}/>
        <Route exact path='/register' render={(props) => (<RegisterPage {...props}/>)}/>
      </Switch>
    </div>
  )
}


export default App;
