import { makeStyles } from "@material-ui/core/styles";
import sky from '../images/sky.jpg';


const useStyles = makeStyles((theme) =>({
    root: {
      backgroundImage: `url(${sky})`,
      height: '100%',
      padding: theme.spacing(1, 1, 1, 1),
      marginTop: '-15px',
      position: 'fixed',
      left: 0
    },
    paper: {
        backgroundColor: theme.palette.grey[25],
        height: '90%',
        width: '90%',
        margin: theme.spacing(4, 0, 0, 9)
        //background: 'linear-gradient(150deg, #00416A 10%, #E4E5E6 50%)',
    },
    form: {
      width: '100%', 
      margin: theme.spacing(-2, 0, 0, 0),
    },
    cardMedia: {
      maxWidth: "20%",
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
      '&:hover': {
        backgroundColor: theme.palette.grey.A400
      },
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.grey.A400
    },
    buttonGroup: {
      marginLeft: "690px",
      backgroundColor: theme.palette.grey[300]
    }
  }));

export default useStyles;  