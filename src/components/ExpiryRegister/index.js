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
    // tempErrors.password = formData.password
    //   ? ""
    //   : "La contraseña es requerida.";
    // tempErrors.usuario = formData.usuario
    //   ? ""
    //   : "El nombre de usuario es requerido.";
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

          toast.success("Registro exitoso");
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            onVerify(false);
          }, 5000);
        }
      } else {
        toast.error("Por favor complete el formulario correctamente");
      }
    } catch (error) {
      toast.error(error?.message ? error?.message : "Algo salió mal");
    } finally {
      setLoading(false);
    }
  };
  const commonSelectStyles = {
    "& .MuiSelect-select": {
      color: "#212529",
      backgroundColor: "white",
      padding: "19px",
      width: "100%",
      justifyContent: "center",
      textAlign: "center",
      borderRadius: "2px",
      fontWeight: "light",
      boxShadow: "0 4px 20px grey",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:focus-within": {
      boxShadow: "0 0 10px black",
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: { xs: "90vw", sm: "70vw", md: "50vw", lg: "30vw" },
        width: { xs: "90vw", sm: "70vw", md: "50vw", lg: "25vw" },
        maxHeight: "85vh", // Limiting the height
        margin: "auto",
        marginTop: "-10px",
        position: "relative",
        background: "linear-gradient(to bottom right, #FFD600FF, #295651FF)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        overflowX: "auto", // Horizontal scrolling if needed
        overflowY: "auto", // Vertical scrolling if needed
      }}
    >
      <Stack style={{ position: "absolute", right: 10, top: 10 }}>
        <CloseOutlined
          onClick={() => {
            onVerify(false);
          }}
          style={{
            cursor: "pointer",
            color: "white",
          }}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
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
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflow: "auto",
        }}
        className="expiry__reg__form__wrapper"
      >
        <center
          style={{
            color: "black",
            fontWeight: "bold",
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          iYA PUEDES DISFRUTAR DE TU
        </center>
        <center
          style={{
            color: "black",
            fontWeight: "bold",
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          PRUEBA DE 30 DÍAS GRATIS!
        </center>
        <br></br>
        <center>
          <TextField
            variant="standard"
            placeholder="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              "& .MuiFormLabel-root": {
                color: "#ffffff",
                marginLeft: "9px",
                marginTop: "-3%",
              },
              "& .MuiInputBase-input": {
                color: "#212530",
                backgroundColor: "white",
                padding: "19px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "2px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#212530",
                  fontFamily: "serif",
                  fontSize: "16px",
                  fontWeight: 300, // Adjusted to semi-light
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
        <center>
          <TextField
            variant="standard"
            placeholder="Dirección"
            name="domi"
            value={formData.domi}
            onChange={handleChange}
            error={!!errors.domi}
            helperText={errors.domi}
            sx={{
              "& .MuiFormLabel-root": {
                color: "#ffffff",
                marginLeft: "9px",
                marginTop: "-3%",
              },
              "& .MuiInputBase-input": {
                color: "#212530",
                backgroundColor: "white",
                padding: "19px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "2px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#212530",
                  fontFamily: "serif",
                  fontSize: "16px",
                  fontWeight: 300, // Adjusted to semi-light
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

        <center>
          <TextField
            variant="standard"
            name="localidad"
            placeholder="Localidad y provincia"
            value={formData.localidad}
            onChange={handleChange}
            error={!!errors.localidad}
            helperText={errors.localidad}
            sx={{
              "& .MuiFormLabel-root": {
                color: "#ffffff",
                marginLeft: "9px",
                marginTop: "-3%",
              },
              "& .MuiInputBase-input": {
                color: "#212530",
                backgroundColor: "white",
                padding: "19px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "2px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#212530",
                  fontFamily: "serif",
                  fontSize: "16px",
                  fontWeight: 300, // Adjusted to semi-light
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
        <center>
          <TextField
            variant="standard"
            name="postal"
            placeholder="Código postal"
            value={formData.postal}
            onChange={handleChange}
            error={!!errors.postal}
            helperText={errors.postal}
            sx={{
              "& .MuiFormLabel-root": {
                color: "#ffffff",
                marginLeft: "9px",
                marginTop: "-3%",
              },
              "& .MuiInputBase-input": {
                color: "#212530",
                backgroundColor: "white",
                padding: "19px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "2px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#212530",
                  fontFamily: "serif",
                  fontSize: "16px",
                  fontWeight: 300, // Adjusted to semi-light
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
        <center>
          <TextField
            variant="standard"
            placeholder="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            error={!!errors.dni}
            helperText={errors.dni}
            sx={{
              "& .MuiFormLabel-root": {
                color: "#ffffff",
                marginLeft: "9px",
                marginTop: "-3%",
              },
              "& .MuiInputBase-input": {
                color: "#212530",
                backgroundColor: "white",
                padding: "19px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "2px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#212530",
                  fontFamily: "serif",
                  fontSize: "16px",
                  fontWeight: 300, // Adjusted to semi-light
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

        <center>
          <TextField
            variant="standard"
            placeholder="Instagram (optional)"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            error={!!errors.instagram}
            helperText={errors.instagram}
            sx={{
              "& .MuiFormLabel-root": {
                color: "#ffffff",
                marginLeft: "9px",
                marginTop: "-3%",
              },
              "& .MuiInputBase-input": {
                color: "#212530",
                backgroundColor: "white",
                padding: "19px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "2px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#212530",
                  fontFamily: "serif",
                  fontSize: "16px",
                  fontWeight: 300, // Adjusted to semi-light
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
        <div style={{ textAlign: "center" }}>
          <TextField
            variant="standard"
            placeholder="Telegram (optional)"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            error={!!errors.telegram}
            helperText={errors.telegram}
            sx={{
              "& .MuiFormLabel-root": {
                color: "#ffffff",
                marginLeft: "9px",
                marginTop: "-3%",
              },
              "& .MuiInputBase-input": {
                color: "#212530",
                backgroundColor: "white",
                padding: "19px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "2px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#212530",
                  fontFamily: "serif",
                  fontSize: "16px",
                  fontWeight: 300, // Adjusted to semi-light
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
        </div>

        <center>
          <FormControl error={!!errors.shirtsize}>
            <Select
              variant="standard"
              displayEmpty
              name="shirtsize"
              value={formData.shirtsize}
              onChange={handleChange}
              error={!!errors.shirtsize}
              sx={{
                color: "black",
                ".MuiSelect-icon": { color: "black" },
                "& .MuiInputBase-input": {
                  color: "#999999",
                  backgroundColor: "white",
                  padding: "9px",
                  width: "200px",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "2px",

                  boxShadow: "0 4px 20px grey",
                },
                backgroundColor: "white",
              }}
              inputProps={{ disableUnderline: false }}
              renderValue={(selected) => {
                if (selected === "") {
                  return (
                    <span
                      style={{
                        color: "#999999",
                        fontFamily: "serif",
                        fontSize: "16px",
                        fontWeight: 300,
                      }}
                    >
                      Talla de camiseta
                    </span>
                  );
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled>
                Talla de camiseta
              </MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="L">L</MenuItem>
            </Select>
            <FormHelperText sx={{ color: "#ffffff" }}>
              {errors.shirtsize}
            </FormHelperText>
          </FormControl>
        </center>
        <center>
          <FormControl error={!!errors.color} sx={commonSelectStyles}>
            <Select
              variant="standard"
              displayEmpty
              name="color"
              value={formData.color}
              onChange={handleChange}
              error={!!errors.color}
              sx={{
                color: "#212529",
                ".MuiSelect-icon": { color: "black" },
                "& .MuiInputBase-input": {
                  color: "#999999",
                  backgroundColor: "white",
                  padding: "9px",
                  width: "200px",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "4px",
                  fontWeight: "light",
                  boxShadow: "0 4px 20px grey",
                },
                backgroundColor: "white",
              }}
              inputProps={{ disableUnderline: false, color: "#aaa" }}
              renderValue={(selected) => {
                if (selected === "") {
                  return (
                    <span
                      style={{
                        color: "#999999",
                        fontFamily: "serif",
                        fontSize: "16px",
                        fontWeight: 300,
                      }}
                    >
                      Color de camiseta
                    </span>
                  );
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled>
                Color de camiseta
              </MenuItem>
              <MenuItem value="Blanco">Blanco</MenuItem>
              <MenuItem value="Negro">Negro</MenuItem>
            </Select>
            <FormHelperText sx={{ color: "#ffffff" }}>
              {errors.color}
            </FormHelperText>
          </FormControl>
        </center>
      </Box>
      <Button
        endIcon={isSuccess ? <DoneSharp /> : <Send />}
        type="submit"
        disabled={loading}
        size="small"
        variant="contained"
        color={isSuccess ? "success" : "primary"}
        sx={{
          mt: 2,
          bgcolor: "#295651FF", // Set the background color here
          color: "white",
          "&:hover": {
            bgcolor: "#1E3B3A", // Darker shade for hover effect if needed
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
        {isSuccess ? "Éxito" : "AMPLIAR A 30 días Gratis"}{" "}
        {/* Corrected typo here */}
      </Button>
    </Box>
  );
};

export default ExpiryRegistrationForm;
