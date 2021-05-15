import React from "react";
import Map from "./Map";
import CardMedia from "@material-ui/core/CardMedia";
import fiberImg from "../images/fiberSpreadImg.png";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/MainPage";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function MainPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <Grid container spacing={3} direction="coulmn">
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
                size='large'
                color="default"
                className={classes.logoutBtn}
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={1}/>
          <Grid item xs={2}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoFocus
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
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="housernumber"
                label="House number"
                id="housernumber"
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
          <Grid item>
            <Map />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </div>
  );
}
