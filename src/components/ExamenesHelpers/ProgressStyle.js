import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  porgressMainWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressWrapper: {
    height: "200px",
    width: "auto",
    backgroundColor: "#FeFeFe",
    margin: "0px auto",
    display: "flex",
    alignItems: "end",
    boxShadow: "0px 30px 0px 0px rgb(221,224,227,0.75)",
    "@media (max-width: 720px)": {
      height: "80px",
      boxShadow: "0px 30px 0px 0px rgb(221,224,227,0.75)",
    },
  },
  progressTextWrapper: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progresstext: {
    margin: "20px 0px",
    color: "black",
    fontSize: "19px",
    fontWeight: 900,
  },
  progressContent: {
    width: "80px",
    "@media (max-width: 720px)": {
      width: "60px",
    },
  },
}));
