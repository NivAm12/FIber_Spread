import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) =>({
    root: {
      backgroundColor: "#499db3",
      height: '100vh',
    },
    paper: {
        backgroundColor: theme.palette.grey[50],
        margin: theme.spacing(5, 4, 2, 4),
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
      marginLeft: "15px"
    },
    logoutBtn: {
      float: "right",
      marginTop: "20px",
      marginRight: "20px"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.info.main,
    }
  }));

export default useStyles;  