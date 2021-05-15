import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    cardMedia: {
      maxWidth: 195,
      height: 140,
      float: "left",
      marginRight: "10px",
      marginBottom: "15px"
    },
    logoutBtn: {
      maxWidth: 100,
      float: "right",
    },
  });

export default useStyles;  