import React from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import logo from '../../assets/img/login_logo.webp'
import iosLogo from '../../assets/img/login_logo.png'

const useStyles = makeStyles({
    logo: {
      maxWidth: 96,
      marginLeft: 'auto',
    },
    appBar: {
        background: 'linear-gradient(to right, #003466 , #3ea9fb)',
        boxShadow: '10',
    }
  });

const LoginNavbar = () => {
    const classes= useStyles();
    return (
        <AppBar position="sticky" color="inherit" className={classes.appBar}>
            <Toolbar>
                <img src={logo} alt="logo" className={classes.logo} srcSet={iosLogo}/>
            </Toolbar>
        </AppBar>
    )
}

export default LoginNavbar
