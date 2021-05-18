import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import React from "react";
import axios from "axios";
import { Switch, Route, Redirect } from 'react-router-dom';
import useStyles from "../src/styles/App";

function App() {

  const classes = useStyles();

  const getUser = async() => {
    const response = await axios.get(`http://localhost:5000/user`);
    return response.data.user;
  }

  return (
    <div>
      <Switch>
        <Route exact path='/'
          render={(props) => getUser() !== null 
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
