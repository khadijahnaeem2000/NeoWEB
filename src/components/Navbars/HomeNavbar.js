import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Popover } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getLocalUserdata } from "../../services/auth/localStorageData";
import { withStyles } from "@material-ui/core/styles"; 
import useMediaQuery from "@material-ui/core/useMediaQuery"; 
import useStyles from "./styles.js"; 
import icon from "../../assets/img/images/icons-menu-white.svg";
import profilepic from "../../assets/img/images/layer_25.webp"; // Importing default profile picture

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
  const classes = useStyles(); 
  const isMobile = useMediaQuery('(max-width:600px)'); 
  const data = useSelector((state) => state.userInfo.userRegister.success);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null); // State for avatar URL
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const userData = getLocalUserdata();
    if (userData) {
      setUserName(userData.name);
      setUserEmail(userData.email);

      // Setting avatar URL if available or using default URL
      const userAvatar = userData.avatar ? `https://neoestudio.net/userImage/${userData.avatar}` : profilepic;
      setAvatarUrl(userAvatar); 
    }

    // Fetching all local storage data and logging it to the console
    const allLocalStorageData = { ...localStorage };
    console.log("Local Storage Data:", allLocalStorageData);
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
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
        <div className={classes.avatarContainer}>
        {!isMobile && (
            <div className={classes.userInfo}>
              <Typography className={classes.userName}>{userName}</Typography>
              <Typography className={classes.userEmail}>{userEmail}</Typography>
            </div>
          )}
          <Avatar 
            onClick={handleAvatarClick} 
            className={classes.avatar}
            src={avatarUrl} // Display avatar from external URL or fallback image
          >
            {/* If you want initials or other content when there's no image */}
          </Avatar>
        </div>
        {isMobile && (
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            PaperProps={{
              style: {
                width: 'auto',
              },
            }}
          >
            <Typography style={{ padding: 10 }}>
              {userName} <br />
              {userEmail}
            </Typography>
          </Popover>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavbar;
