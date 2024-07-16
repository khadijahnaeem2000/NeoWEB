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
    let timerInterval;
    const registerData = localStorage.getItem("registerData");
    if (registerData) {
      const parsedData = JSON.parse(registerData);
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
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isVerifiedData , getData]);

 
  useEffect(() => {
    if (!isVerifiedData) {
      setIsVerifiedData(data);
    }
  }, [data]);

  const showRegForm = (show) => {
    setShowRegister(show);
  };

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