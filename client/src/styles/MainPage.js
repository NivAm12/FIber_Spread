import { makeStyles } from "@material-ui/core/styles";
import sky from '../images/sky.jpg';


const useStyles = makeStyles((theme) =>({
    root: {
      backgroundImage: `url(${sky})`,
      height: '100vh',
    },
    paper: {
        backgroundColor: theme.palette.grey[50],
        margin: theme.spacing(5, 5, 2, 4),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(-2),
    },
    cardMedia: {
      maxWidth: 195,
      height: 140,
      float: "left",
      marginRight: "10px",
      marginBottom: "15px",
      marginLeft: "25px"
    },
    logoutBtn: {
      float: "right",
      marginTop: "20px",
      marginRight: "20px"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.grey.A400
    },
    buttonGroup: {
      marginLeft: "570px"
    }
  }));

export default useStyles;  