import React from "react";
import Map from "./Map";
import CardMedia from "@material-ui/core/CardMedia";
import fiberImg from "../images/fiberSpreadImg.png";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/MainPage";

export default function MainPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={2} sm={12}>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          image={fiberImg}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <Map/>
      </Grid>
    </Grid>
    </div>
  );
}
