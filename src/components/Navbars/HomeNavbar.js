import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles.js";
import icon from "../../assets/img/images/icons-menu-white.svg";
import logo from "../../assets/img/images/logo.webp";
import iosLogo from "../../assets/img/images/logo.png";
import { withStyles } from "@material-ui/core/styles";
import ExpiryRegistrationForm from "components/ExpiryRegister/index.js";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none",
      color: "white",
    },
  },
})(Typography);

const HomeNavbar = (props) => {
  const data = useSelector((state) => state.userInfo.userRegister.success);

  const [isVerifiedData, setIsVerifiedData] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const getData = JSON.parse(localStorage.getItem("neoestudio"));

  useEffect(() => {
    try {
      let localRegData = localStorage.getItem("registerData");
      const parseData = localRegData ? JSON.parse(localRegData) : null;
      if (data) {
        setIsVerifiedData(data);
      } else if (!parseData && !data) {
        localStorage.clear();
        window.location.replace("https://neoestudio.net/aula_virtual");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }, [data]);

  useEffect(() => {
    let timerInterval;
    const regData = localStorage.getItem("registerData");
    if (regData) {
      try {
        const parsedData = JSON.parse(regData);
        if (parsedData.IsRegistered === "NO") {
          timerInterval = setInterval(() => {
            const logTime = localStorage.getItem("loginTime");
            if (logTime) {
              const currentTime = new Date().getTime();
              const elapsedTime = currentTime - logTime;
              const timeToPopup = 3 * 60 * 1000;

              if (elapsedTime >= timeToPopup) {
                if (getData?.IsRegistered === "NO") {
                  setShowRegister(true);
                }
              } else {
                if (getData?.IsRegistered === "NO") {
                  setShowRegister(false);
                }
              }
            }
          }, 1000 * 60 * 1);
        } else if (parsedData.IsRegistered === "YES") {
          localStorage.removeItem("loginTime");
        }
      } catch (error) {
        console.log(error);
      }
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isVerifiedData, getData, data]);

  function triggerOnClose(event) {
    event.preventDefault();
    localStorage.clear();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", triggerOnClose);

    return () => {
      window.removeEventListener("beforeunload", triggerOnClose);
    };
  }, []);

  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky" className={classes.appBar} color="inherit">
        <Toolbar>
          <WhiteTextTypography
            variant="h6"
            className={classes.title}
            onClick={props.toggleSideMenu}
          >
            <img src={icon} alt="menu" className={classes.image} />
            Menu
          </WhiteTextTypography>
          <div className={classes.logoHorizontallyCenter}></div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </>
  );
};
export default HomeNavbar;
