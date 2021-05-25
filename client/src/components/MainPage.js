import React, { useState, useEffect } from "react";
import Map from "./Map";
import CardMedia from "@material-ui/core/CardMedia";
import fiberImg from "../images/fiberSpreadImg.png";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/MainPage";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ButtonGroup } from "@material-ui/core";
import axios from "axios";


export default function MainPage(props) {
  // DATA:
  const [cityName, setCityName] = useState("");
  const [streetName, setstreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [addresses, setAddresses] = useState("");

  // STYLE:
  const classes = useStyles();


  // METHODS:

  useEffect(async() => {
    try{
      console.log("in use effect")
      const {data} = await axios.get('http://localhost:5000/search');
      setAddresses(data.data);
    }
    catch(err){

    }

  },[])

  const handleLogout = async (event) => {
    //prevent refresh
    event.preventDefault();

    try {
      // logout from server:
      await axios.get('http://localhost:5000/logout');
    } finally {
      //redirect to login page
      props.history.push("/login");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try{
      // search the address:
      const response = await axios.post('http://localhost:5000/search', {cityName, streetName, houseNumber});
      console.log(response.data.data);
    }
    catch(err){
      console.log(err);
    }
  }

  

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1} direction="coulmn">
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <CardMedia
                className={classes.cardMedia}
                component="img"
                image={fiberImg}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                size="large"
                color="default"
                className={classes.logoutBtn}
                startIcon={<ExitToAppIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <ButtonGroup
              size="small"
              aria-label="small outlined button group"
              className={classes.buttonGroup}
              variant="outlined"
            >
              <Button>Partner</Button>
              <Button>Cellcom</Button>
              <Button>Unlimited</Button>
            </ButtonGroup>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <form className={classes.form} onSubmit={handleSearch} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoFocus
                  value={cityName}
                  onChange={(event) => setCityName(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  autoFocus
                  value={streetName}
                  onChange={(event) => setstreetName(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="housernumber"
                  label="House number"
                  id="housernumber"
                  value={houseNumber}
                  onChange={(event) => setHouseNumber(event.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Search
                </Button>
              </form>
            </Grid>
            <Grid item xs={1}>
              <Map markers={addresses}/>
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Paper>
    </div>
  );
}
