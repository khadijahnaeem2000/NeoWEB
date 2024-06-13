import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  courseWrapper: {
    padding: "30px 0px",
    overflow: "hidden",
    display: "flex",
    minHeight: "100vh",
    fontFamily: "ProximaSoft-regular",
    backgroundColor: "#f7f7f7",
  },
  folderWrapper: {
    margin: "10px auto",
  },
  containerStyles: {
    height: 5,
    width: "100%",
    backgroundColor: "#e0e0de",
  },
  fillerStyles: {
    height: "100%",
    width: "0%",
    backgroundColor: "#1976d2",
    transition: "width 10s ease-in-out",
    "&:focus": {
      width: "100%",
    },
  },
  heading: {
    fontSize: "20px",
    color: "black",
    fontWeight: "600",
    fontFamily: "ProximaSoft-bold",
    display: "flex",
    alignItems: "center",
    margin: "5px",
    "@media (max-width: 720px)": {
      fontSize: "9px",
    },
  },
  BoxWrapper1212: {
    backgroundColor: "#f7f7f7 !important",
    boxShadow: "none !important",
  },
  headingImg: {
    width: "50px",
    margin: "0px 10px",
    "media (max-width:720px)": {
      width: "40px",
      margin: "0px 5px",
    },
  },
  headingText: {
    fontSize: "20px",
    "@media (max-width: 720px)": {
      fontSize: "10px",
    },
  },
  dataWrapper: {
    display: "flex",
    margin: "1%",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "200px",
    backgroundColor: "white",
    border: "5px solid #e9e9e9",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topImgHeadWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  examLinks: {
    color: "black",
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    margin: "10px 0px",
    "&:hover": {
      color: "royalblue",
      fontFamily: "ProximaSoft-bold",
    },
    "@media (max-width: 720px)": {
      fontSize: "10px",
    },
  },
  quizWrapperInner: {
    margin: "0px auto",
    minWidth: "800px",
    fontFamily: "ProximaSoft-regular",
    overflow: "hidden",
    "@media (max-width: 720px)": {
      padding: "0px",
      minWidth: "100%",
    },
  },
  quizEndWrapperInner: {
    paddingTop: "50px",
    margin: "0px auto",
    minWidth: "800px",
    overflow: "hidden",
    "@media (max-width: 720px)": {
      paddingTop: "0px",
      minWidth: "100%",
    },
  },

  quizQuestionHeading: {
    fontSize: "30px",
    margin: "20px ",
    textAlign: "start",
    fontFamily: "ProximaSoft-bold",
    "@media (max-width: 720px)": {
      fontSize: "20px",
      margin: "5px auto",
      textAlign: "start",
    },
  },
  Options: {
    display: "flex",
    flexDirection: "column",
    margin: "20px auto",
    alignItems: "start",
  },
  answerLinks: {
    display: "flex",
    width: "100%",
    margin: "5px 0px",
    textAlign: "start",
    minHeight: "2em",
    alignItems: "center",
  },
  answerLinksInnerImg: {
    height: "2em",
    width: "2em",
    "@media (max-width: 720px)": {
      height: "1em",
      width: "1em",
    },
  },
  answerLinksInner1: {
    width: "60px",
    margin: "0 auto",
    color: "royalblue",
    "@media (max-width: 720px)": {
      width: "15%",
    },
  },
  answerLinksInner2: {
    width: "95%",
    "@media (max-width: 720px)": {
      width: "85%",
    },
  },
  answerLinksInner3: {
    width: "5%",
    margin: "0 15px",
    color: "royalblue",
    height: "50px",
  },
  ImgTextHeading: {
    fontSize: "15px",
    fontWeight: "800",
    color: "white",
    position: "relative",
    bottom: "28px",
    textAlign: "center",
  },
  timerWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "5px",
    margin: "20px auto",
  },
  timerIcons: {
    margin: "0px 10px",
    cursor: "pointer",
    width: "40px",
    justifyContent: "start",
    [theme.breakpoints.down('490')]: {
      width: '30px',
    },
  },
  timerHeading: {
    margin: "0px 10px",
    cursor: "pointer",
    fontSize: "20px",
    color: "#0A52CB",
    fontFamily: "ProximaSoft-regular",
    "@media (max-width: 720px)": {
      fontSize: "14px",
      fontWeight: "700",
    },
  },
  // QUIZ SCREEN 3 STYLING

  wrapperMain: {
    margin: "0 auto",
    overflow: "hidden",
    display: "flex",
    fontFamily: "ProximaSoft-regular",
  },
  wrapperMain1: {
    margin: "0 auto",
    display: "flex",
    fontFamily: "ProximaSoft-regular",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      height: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#bfbfbf",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "gray",
    },
  },
  examenesHeading3: {
    fontSize: "30px",
    margin: "20px auto 10px",
    textAlign: "center",
    "@media (max-width: 720px)": {
      fontSize: "20px",
    },
  },
  ResultWrappers: {
    margin: "10px auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    fontFamily: "ProximaSoft-regular",
  },
  innerResultWrapper: {
    width: "100%",
  },
  resultBtnMain: {
    width: "100%",
    textAlign: "center",
  },
  revisarBtn: {
    margin: "20px",
    "@media (max-width: 720px)": {
      width: "80%",
      margin: "0px",
    },
  },
  salirBtn: {
    margin: "20px",
    "@media (max-width: 720px)": {
      width: "80%",
      margin: "0px",
    },
  },
  progressBarWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px auto",
    height: "100%",
    fontFamily: "ProximaSoft-regular",
  },
  resultData: {
    fontSize: "20px",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "ProximaSoft-regular",
    "@media (max-width: 720px)": {
      fontSize: "15px",
    },
  },
  resultDataBold: {
    fontSize: "20px",
    textAlign: "end",
    fontWeight: "700",
    "@media (max-width: 720px)": {
      fontSize: "15px",
    },
  },
  resultBtnWrapper: {
    margin: "10px auto",
    display: "flex",
    width: "100%",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      height: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#bfbfbf",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "gray",
    },
    "@media (max-width: 920px)": {
      overflow: "hidden",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  },
  resultBtn: {
    fontSize: "16px",
    fontWeight: "800",
    borderRadius: "50%",
    padding: "10px",
    color: "white",
    height: "auto",
    width: "45px",
    backgroundSize: "cover",
    "@media (max-width: 1315px)": {
      width: "40px",
      fontSize: "13px",
    },
  },
  resultBtn1: {
    fontSize: "16px",
    fontWeight: "800",
    borderRadius: "50%",
    padding: "10px",
    color: "white",
    height: "auto",
    width: "45px",
    "@media (min-width: 1315px)": {
      width: "40px",
      fontSize: "13px",
    },
  },
}));
