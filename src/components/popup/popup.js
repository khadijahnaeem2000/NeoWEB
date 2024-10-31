// Popup.js
import React from "react";
import "./style.css";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    InputLabel,
    Button,
    Box,
  } from "@mui/material"; // Import the CSS file for other styling

const PopupUser = ({  onClose }) => {
  const handleRedirect = (url) => {
    window.location.href = url; // Redirects to the specified URL
  };
  return (
    <div className="popup-container">
      <button className="popup-close-btn" onClick={onClose}>
        &times;
      </button>
      <p className="popup-body"></p>
      <center>
 
    
 <TextField
   variant="standard"
   placeholder="Nombre"
   name="name"
   
   sx={{
     "& .MuiFormLabel-root": {
       color: "#ffffff",
       marginLeft: "9px",
       marginTop: "-3%",
     },
     "& .MuiInputBase-input": {
       color: "#FFFFFF",
       backgroundColor: "transparent",
       padding: "25px",
       width: "100%", // Width set to 100%
       justifyContent: "center",
       textAlign: "center",
       borderRadius: "5px",
       fontWeight: 300,
       boxShadow: "0 4px 20px grey",
       "&::placeholder": {
         color: "#FFFFFF",
         fontFamily: "Montserrat-regular",
         fontSize: "16px",
         fontWeight: 300,
       },
     },
     "& .MuiInputBase-root": {
       "&:focus-within": {
         boxShadow: "0 0 10px black",
       },
     },
   }}
   InputProps={{
     disableUnderline: true,
   }}
 />
 


</center>
<br></br>

<center>
<TextField
   variant="standard"
   placeholder="Contraseña"
   name="password"
  
   sx={{
     "& .MuiFormLabel-root": {
       color: "#ffffff",
       marginLeft: "9px",
       marginTop: "-3%",
     },
     "& .MuiInputBase-input": {
       color: "#FFFFFF",
       backgroundColor: "transparent",
       padding: "25px",
       width: "100%", // Width set to 100%
       justifyContent: "center",
       textAlign: "center",
       borderRadius: "5px",
       fontWeight: 300,
       boxShadow: "0 4px 20px grey",
       "&::placeholder": {
         color: "#FFFFFF",
         fontFamily: "Montserrat-regular",
         fontSize: "16px",
         fontWeight: 300,
       },
     },
     "& .MuiInputBase-root": {
       "&:focus-within": {
         boxShadow: "0 0 10px black",
       },
     },
   }}
   InputProps={{
     disableUnderline: true,
   }}
 />

</center>
<Button
       
        type="submit"
       
        size="small"
        variant="contained"
        color= "primary"
        sx={{
          mt: 2,
          bgcolor: "transparent", // Set the background color here
          color: "white",
          fontFamily: "Montserrat",
          fontWeight: "light",
          border: "1px solid white",
          // Add this line for white border
          "&:hover": {
            bgcolor: "transparent", // Darker shade for hover effect if needed
            border: "1px solid white", // Ensure border stays white on hover
          },
          "& .MuiButton-endIcon": {
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": {
                transform: "scale(1)",
              },
              "50%": {
                transform: "scale(1.2)",
              },
              "100%": {
                transform: "scale(1)",
              },
            },
          },
        }}
      >
  
    
        Submit

     
      </Button>
    </div>
  );
};

export default PopupUser;
