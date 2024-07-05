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
  const [isVerifiedData, setIsVerifiedData] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const getData = JSON.parse(localStorage.getItem("neoestudio"));

  const handleStorageChange = () => {
    const regData = localStorage.getItem("registerData");

    if (regData && regData !== "undefined") {
      try {
        const parsedData = JSON.parse(regData);
        setIsVerifiedData(parsedData);
      } catch (e) {
        console.error("Failed to parse registerData:", e);
      }
    }
  };

  useEffect(() => {
    let timerInterval;
    const registerData = localStorage.getItem("registerData");
    if (registerData) {
      const parsedData = JSON.parse(registerData);
      if (parsedData.IsRegistered === "NO"){
        timerInterval = setInterval(() => {
          const logTime = localStorage.getItem("loginTime");
          if (logTime) {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - logTime;
            const timeToPopup = 3 * 60 * 1000;
            if (isVerifiedData === null) {
              handleStorageChange();
            }
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
      }else if (parsedData.IsRegistered === "YES") {
        localStorage.removeItem("loginTime");
      }
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("https://neoestudio.net/AULA-VIRTUAL");
   
  };

  useEffect(() => {
    handleStorageChange();
    window.addEventListener('beforeunload', handleLogout);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener('beforeunload', handleLogout);
    };
  }, []);
 

  const showRegForm = (show) => {
    handleStorageChange();
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
          <div className={classes.logoHorizontallyCenter}>
            <img
              src={logo}
              srcSet={iosLogo}
              className={`${classes.logo} logo`}
              alt="logo"
            />
          </div>
          <div className={classes.grow} />

          {getData?.IsRegistered === "NO" && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ marginBlock: 2 }}
              onClick={() => {
                setShowRegister(true);
              }}
            >
              Registrarse
            </Button>
          )}

          {isVerifiedData && showRegister && (
            <div className="overlay">
              <div className="popup">
                <ExpiryRegistrationForm
                  isVerifiedData={isVerifiedData}
                  setIsVerifiedData={setIsVerifiedData}
                  onVerify={showRegForm}
                />
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default HomeNavbar;
