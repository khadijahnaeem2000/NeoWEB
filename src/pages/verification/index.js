import React from "react";
import { Container, Box, Typography, CssBaseline, Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userServices from "services/httpService/userAuth/userServices";
const Verification = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const userVerification = async () => {
    try {
      const response = await userServices.verifyingUser("/user", {
        id: userId,
      });

      if (response?.data?.status === "Successfull") {
        localStorage.setItem(
          "neoestudio",
          JSON.stringify(response?.data?.data)
        );
        localStorage.setItem(
          "package",
          JSON.stringify(response?.data?.package)
        );
       
        navigate("/");
      } else {
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
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 80, height: 80 }}>
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
    </Container>
  );
};

export default Verification;
