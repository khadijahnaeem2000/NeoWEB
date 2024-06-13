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
        maxWidth: "30vw",
        width: "25vw",
        height: "85vh",
        margin: "auto",
        marginTop: "-10px",
        position: "relative",
      }}
    >
      <Stack style={{ position: "absolute", right: 0, top: 10 }}>
        <CloseOutlined
          onClick={() => {
            onVerify(false);
          }}
          style={{
            cursor: "pointer",
          }}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          // height: "100%",
          overflow: "auto",
        }}
        className="expiry__reg__form__wrapper"
      >
        <TextField
          variant="standard"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{
            sx: {
              "&::placeholder": {
                fontWeight: 400, 
              },
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
            },
          }}
        />

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
            },
          }}
        />

        <TextField
          variant="standard"
          label="localidad y provincia"
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
            },
          }}
        />
        <TextField
          variant="standard"
          label="Usuario"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          error={!!errors.usuario}
          helperText={errors.usuario}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
            },
          }}
        />
        <TextField
          variant="standard"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
            },
          }}
        />

        <TextField
          variant="standard"
          label="Instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          error={!!errors.instagram}
          helperText={errors.instagram}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
            },
          }}
        />
        <TextField
          variant="standard"
          label="Telegram"
          name="telegram"
          value={formData.telegram}
          onChange={handleChange}
          error={!!errors.telegram}
          helperText={errors.telegram}
          InputLabelProps={{
            sx: {
              fontSize: "15px",
              bottom: "20px",
            },
          }}
        />

        <FormControl error={!!errors.shirtsize}>
          <InputLabel id="demo-simple-select-standard-label">
            Talla de camiseta
          </InputLabel>
          <Select
            variant="standard"
            name="shirtsize"
            value={formData.shirtsize}
            onChange={handleChange}
            error={!!errors.shirtsize}
          >
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
          </Select>
          <FormHelperText
          // sx={{ color: "#bf3333", marginLeft: "14px !important" }}
          >
            {errors.shirtsize}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.color}>
          <InputLabel id="demo-simple-select-standard-label">
            Color de camiseta
          </InputLabel>
          <Select
            variant="standard"
            name="color"
            value={formData.color}
            onChange={handleChange}
            error={!!errors.color}
          >
            <MenuItem value="Blanco">Blanco</MenuItem>
            <MenuItem value="Negro">Negro</MenuItem>
          </Select>
          <FormHelperText
          // sx={{ color: "#bf3333", marginLeft: "14px !important" }}
          >
            {errors.color}
          </FormHelperText>
        </FormControl>
      </Box>
      <Button
        endIcon={isSuccess ? <DoneSharp /> : <Send />}
        type="submit"
        disabled={loading}
        size="small"
        variant="contained"
        color={isSuccess ? "success" : "primary"}
      >
        {isSuccess ? "Éxito" : "Registrarse"}
      </Button>
    </Box>
  );
};

export default ExpiryRegistrationForm;
