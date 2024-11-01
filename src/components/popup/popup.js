import React, { useState } from "react";
import "./style.css";
import { TextField, Button } from "@mui/material";
import { getLocalUserdata } from "services/auth/localStorageData";

const PopupUser = ({ onClose }) => {
  // State to manage input values
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const data = getLocalUserdata();
  const id= data?.id;

  // Function to handle form submission and make the API call
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://neoestudio.net/api/saveredentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'username':usuario, 'password':password,'id':id }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        // Handle successful response, close popup or redirect
        onClose();
      } else {
        // Handle error response
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="popup-container">
      <p className="popup-body"></p>
      <center>
        <br />
        <center
          style={{
            color: "white",
            fontWeight: "bold",
            fontFamily: '"Montserrat-bold", sans-serif',
          }}
        >
          Ingrese el nombre de usuario y la contraseña de su cuenta de alumno
        </center>
        <br />

        <TextField
          variant="standard"
          placeholder="Usuario"
          name="name"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
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
              width: "100%",
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

        <br />

        <TextField
          variant="standard"
          placeholder="Contraseña"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
              width: "100%",
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

        <Button
          onClick={handleSubmit}
          size="small"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            bgcolor: "transparent",
            color: "white",
            fontFamily: "Montserrat",
            fontWeight: "light",
            border: "1px solid white",
            "&:hover": {
              bgcolor: "transparent",
              border: "1px solid white",
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
      </center>
    </div>
  );
};

export default PopupUser;
