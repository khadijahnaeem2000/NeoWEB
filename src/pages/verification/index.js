import React from "react";
import { Container, Box, Typography, CssBaseline, Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userServices from "services/httpService/userAuth/userServices";
import { useDispatch } from "react-redux";
import { useState } from "react";
import logo from "../../assets/img/images/logo.webp";
import "./index.css";

const Verification = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    const loginTime = new Date().getTime();
    localStorage.setItem("loginTime", loginTime);
  };

  const userVerification = async () => {
    try {
      const response = await userServices.verifyingUser("/userverify", {
        id: userId,
      });
      

      if (response?.data?.status === "Successfull") {
        if (response?.data?.data.field1x === "Bloquear") {
          localStorage.setItem(
            "neoestudio",
            JSON.stringify(response?.data?.data)
          );
          navigate("/");
        } else {
          localStorage.setItem(
            "neoestudio",
            JSON.stringify(response?.data?.data)
          );

          dispatch({
            type: "User_Register_Success",
            payload: response.data.data,
          });
          localStorage.setItem(
            "package",
            JSON.stringify(response?.data?.package)
          );
          if (response?.data?.data?.IsTelephoneverified === "YES") {
            handleLoginSuccess();
          }

          navigate("/");
        }
      } else if (response?.data?.status === "Unsuccessfull") {
        localStorage.clear();
        window.location.replace("https://neoestudio.net/pago-blocked");
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (userId) {
      userVerification();
    }
  }, [userId]);
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {message ? (
        <div className="container">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div className="message">
            <p className="heading">Lo siento!!</p>
            <p>{message}</p>
          </div>
          <div className="animation">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main", width: 80, height: 80 }}
          >
            <VerifiedUserIcon sx={{ fontSize: 50 }} />
          </Avatar>
          <Box sx={{ width: "100%", mt: 8 }}>
            <LinearProgress />
          </Box>
          <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
            Verificación de usuario
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Su cuenta ha sido verificada exitosamente. Ahora puedes acceder a
            todos las características de nuestro servicio. Gracias por verificar
            tu e-mail DIRECCIÓN.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Verification;
