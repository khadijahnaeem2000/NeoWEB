import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Send, DoneSharp, CloseOutlined } from "@mui/icons-material";
import userServices from "services/httpService/userAuth/userServices";
import { getLocalUserdata } from "services/auth/localStorageData";
import logo from "../../assets/img/images/logo.webp";
import iosLogo from "../../assets/img/images/logo.png";

const ExpiryRegistrationForm = ({
  isVerifiedData,
  setIsVerifiedData,
  onVerify,
}) => {
  const data = getLocalUserdata();
  const [formData, setFormData] = useState({
    id: data?.id,
    name: "",
    password: "",
    usuario: "",
    shirtsize: "",
    color: "",
    dni: "",
    domi: "",
    localidad: "",
    postal: "",
    instagram: "",
    telegram: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "El nombre es requerido.";
    tempErrors.password = formData.password
      ? ""
      : "La contraseña es requerida.";
    tempErrors.usuario = formData.usuario
      ? ""
      : "El nombre de usuario es requerido.";
    tempErrors.shirtsize = formData.shirtsize
      ? ""
      : "El tamaño de camiseta es requerido.";
    tempErrors.color = formData.color
      ? ""
      : "El color de camiseta es requerido.";
    tempErrors.dni = formData.dni ? "" : "El DNI es requerido.";
    tempErrors.domi = formData.domi ? "" : "La dirección es requerida.";
    tempErrors.localidad = formData.localidad
      ? ""
      : "La localidad y provincia son requeridas.";
    tempErrors.postal = formData.postal ? "" : "El código postal es requerido.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (validate()) {
        const response = await userServices.registerwith30days(
          "/Registerwith30days",
          formData
        );
        if (response.data.status === "Successful") {
          if (isVerifiedData !== null) {
            setIsVerifiedData((prevState) => ({
              ...prevState,
              IsRegistered: "YES",
            }));
          }

          toast.success("Regístrese con éxito");
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            onVerify(false);
          }, 5000);
        }
      } else {
        toast.error("Por favor complete el registro desde");
      }
    } catch (error) {
      toast.error(error?.message ? error?.message : "Algo salió mal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: { xs: "90vw", sm: "80vw", md: "50vw", lg: "30vw" },
        width: "100%",
        margin: "auto",
        marginTop: "-10px",
        position: "relative",
        padding: { xs: 2, sm: 3 },
        height: "fit-content",
        background: "linear-gradient(to right, #8360c3, #2ebf91)", // Gradient background
        borderRadius: 4, // Rounded corners
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        color: "#fff", // White text color for better contrast
      }}
    >
      <Stack style={{ position: "absolute", right: 0, top: 10 }}>
        <CloseOutlined
          onClick={() => {
            onVerify(false);
          }}
          style={{
            cursor: "pointer",
            color: "#fff", // White color for better contrast
          }}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <img
          style={{
            width: 200,
            objectFit: "contain",
          }}
          src={logo}
          srcSet={iosLogo}
          alt="logo"
        />
        <p>Bienvenid@ al Curso de Ingreso a la Guardia Civil</p>
        <p>2024/2025</p>
        <p>Ya puedes disfrutar de tu Prueba de 30 días Gratis</p>
        <p>Ahora... ¡REGÍSTRATE!</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        className="expiry__reg__form__wrapper"
      >
        <TextField
          variant="standard"
          label="Dirección"
          placeholder="Ingresa tu dirección completa"
          name="domi"
          value={formData.domi}
          onChange={handleChange}
          error={!!errors.domi}
          helperText={errors.domi}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
              color: "#fff", // White label color
            },
          }}
          InputProps={{
            sx: {
              color: "#fff", // White text color
            },
          }}
        />

        <TextField
          variant="standard"
          label="Localidad y Provincia"
          name="localidad"
          placeholder="Ingresa tu localidad y provincia"
          value={formData.localidad}
          onChange={handleChange}
          error={!!errors.localidad}
          helperText={errors.localidad}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
              color: "#fff", // White label color
            },
          }}
          InputProps={{
            sx: {
              color: "#fff", // White text color
            },
          }}
        />
        <TextField
          variant="standard"
          label="Código Postal"
          name="postal"
          placeholder="000000"
          value={formData.postal}
          onChange={handleChange}
          error={!!errors.postal}
          helperText={errors.postal}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
              color: "#fff", // White label color
            },
          }}
          InputProps={{
            sx: {
              color: "#fff", // White text color
            },
          }}
        />
        <TextField
          variant="standard"
          label="DNI"
          placeholder="Ingresa tu DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          error={!!errors.dni}
          helperText={errors.dni}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
              color: "#fff", // White label color
            },
          }}
          InputProps={{
            sx: {
              color: "#fff", // White text color
            },
          }}
        />

        <TextField
          variant="standard"
          label="Instagram (optional)"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          error={!!errors.instagram}
          helperText={errors.instagram}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
              color: "#fff", // White label color
            },
          }}
          InputProps={{
            sx: {
              color: "#fff", // White text color
            },
          }}
        />
        <TextField
          variant="standard"
          label="Telegram (optional)"
          name="telegram"
          value={formData.telegram}
          onChange={handleChange}
          error={!!errors.telegram}
          helperText={errors.telegram}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
              color: "#fff", // White label color
            },
          }}
          InputProps={{
            sx: {
              color: "#fff", // White text color
            },
          }}
        />

        <FormControl error={!!errors.shirtsize}>
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ color: "#fff" }} // White label color
          >
            Talla de camiseta
          </InputLabel>
          <Select
            variant="standard"
            name="shirtsize"
            value={formData.shirtsize}
            onChange={handleChange}
            error={!!errors.shirtsize}
            sx={{ color: "#fff" }} // White text color
          >
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
          </Select>
          <FormHelperText>{errors.shirtsize}</FormHelperText>
        </FormControl>

        <FormControl error={!!errors.color}>
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ color: "#fff" }} // White label color
          >
            Color de camiseta
          </InputLabel>
          <Select
            variant="standard"
            name="color"
            value={formData.color}
            onChange={handleChange}
            error={!!errors.color}
            sx={{ color: "#fff" }} // White text color
          >
            <MenuItem value="Blanco">Blanco</MenuItem>
            <MenuItem value="Negro">Negro</MenuItem>
          </Select>
          <FormHelperText>{errors.color}</FormHelperText>
        </FormControl>
      </Box>
      <Button
        endIcon={isSuccess ? <DoneSharp /> : <Send />}
        type="submit"
        disabled={loading}
        size="small"
        variant="contained"
        color={isSuccess ? "success" : "primary"}
        sx={{
          alignSelf: "center",
          backgroundColor: isSuccess ? "#4caf50" : "#1976d2", // Custom background color for success state
          "&:hover": {
            backgroundColor: isSuccess ? "#388e3c" : "#1565c0", // Custom hover color for success state
          },
        }}
      >
        {isSuccess ? "Éxito" : "Registrarse"}
      </Button>
    </Box>
  );
};

export default ExpiryRegistrationForm;
