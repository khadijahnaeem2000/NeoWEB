import React, { useState ,useEffect} from "react";
import { toast } from "react-toastify";
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
import backgroundImage from "../../assets/img/expirybg.png";
import { useDispatch } from "react-redux";

const ExpiryRegistrationForm = ({
  isVerifiedData,
  setIsVerifiedData,
  onVerify,
}) => {
  const dispatch = useDispatch();
  const data = getLocalUserdata();
  console.log("Local storage data:", data);
  const id = data.id;
  console.log("Local storage data:", id);
  const [formData, setFormData] = useState({
    id: data?.id,
    // password: "",
    // usuario: "",
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
  const [registrationData, setRegistrationData] = useState(null);

  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await fetch(`https://neoestudio.net/api/Registerdata/${formData.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRegistrationData(data.data); // Store the fetched data in state
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data.data, // Populate formData with the fetched data
        }));
       
      } catch (error) {
        console.error("Error fetching registration data:", error);
      }
    };

    if (formData.id) {
      fetchRegistrationData();
    }
  }, [formData.id]); // Fetch data when formData.id is available

  useEffect(() => {
    if (registrationData) {
      // Now you can safely access color
    }
  }, [registrationData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    // tempErrors.name = formData.name ? "" : "El nombre es requerido.";
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

            dispatch({
              type: "User_Register_Success",
              payload: {
                ...isVerifiedData,
                IsRegistered: "YES",
              },
            });
          }
          localStorage.removeItem("loginTime");
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
        maxHeight: "85vh",
        height: "auto",
        minHeight: "400px", // Limiting the height
        margin: "auto",
        marginTop: "-10px",
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px", // width of the scrollbar
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.7)", // white color with some transparency
          borderRadius: "10px", // curve the scrollbar
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent", // transparent track background
        }, // Ensures vertical scrolling
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
        }}
        className="expiry__reg__form__wrapper"
      >
        <center
          style={{
            color: "white",
            fontWeight: "bold",
            fontFamily: '"Montserrat-bold", sans-serif',
            whiteSpace: "nowrap", // Prevent text wrapping
          }}
        >
             {Object.values(registrationData || {}).some(value => value)
    ? "¿QUIERES MODIFICAR TUS DATOS?"
    : "IYA PUEDES DISFRUTAR DE TU"}
        </center>
        <center
          style={{
            color: "white",
            fontWeight: "bold",
            fontFamily: '"Montserrat-bold", sans-serif',
            whiteSpace: "nowrap", // Prevent text wrapping
          }}
        >
         {Object.values(registrationData || {}).some(value => value)
    ? "PERSONALES?"
    : "PRUEBA DE 48 HORAS GRATIS!"}
        </center>
        <br></br>
        {/* <center>
 
    
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

<center>
<TextField
      variant="standard"
      placeholder="Contraseña"
      name="password"
      value={formData.password}
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

</center> */}
        <center>
          <TextField
            variant="standard"
            placeholder="Dirección (calle, núm., piso, letra)"
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
                color: "#FFFFFF",
                backgroundColor: "transparent",
                padding: "25px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "5px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#FFFFFF",
                  fontFamily: "Montserrat-regular",
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
                color: "#FFFFFF",
                backgroundColor: "transparent",
                padding: "25px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "6px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#FFFFFF",
                  fontFamily: "Montserrat-regular",
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
                color: "#FFFFFF",
                backgroundColor: "transparent",
                padding: "25px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "6px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#FFFFFF",
                  fontFamily: "Montserrat-regular",
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
                color: "#FFFFFF",
                backgroundColor: "transparent",
                padding: "25px",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "6px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#FFFFFF",
                  fontFamily: "Montserrat-regular",
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
            name="Instagram"
            value={formData.Instagram}
            onChange={handleChange}
            error={!!errors.Instagram}
            helperText={errors.Instagram}
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
                borderRadius: "6px",
                fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                boxShadow: "0 4px 20px grey",
                "&::placeholder": {
                  color: "#FFFFFF",
                  fontFamily: "Montserrat-regular",
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
        <FormControl error={!!errors.shirtsize}>
  <Select
    variant="standard"
    displayEmpty
    name="shirtsize"
    value={formData.shirtsize || ""} // Ensure value is an empty string by default
    onChange={handleChange}
    error={!!errors.shirtsize}
    sx={{
      color: "black",
      ".MuiSelect-icon": { color: "black" },
      "& .MuiInputBase-input": {
        color: "#999999",
        backgroundColor: "transparent",
        padding: "12px",
        width: "200px",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: "6px",
        boxShadow: "0 4px 20px grey",
      },
      backgroundColor: "transparent",
    }}
    inputProps={{ disableUnderline: false }}
    renderValue={(selected) => {
      if (selected === "") {
        return (
          <span
            style={{
              color: "#999999",
              fontFamily: "Montserrat-regular",
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
  <FormHelperText sx={{ color: "#ffffff" }}>{errors.shirtsize}</FormHelperText>
</FormControl>

        </center>
        <center>
        <FormControl error={!!errors.color} sx={commonSelectStyles}>
  <Select
    variant="standard"
    displayEmpty
    name="color"
    value={formData.color || ""} // Ensure an empty string default
    onChange={handleChange}
    error={!!errors.color}
    sx={{
      color: "#212529",
      ".MuiSelect-icon": { color: "black" },
      "& .MuiInputBase-input": {
        color: "#999999",
        backgroundColor: "transparent",
        padding: "12px",
        width: "200px",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: "6px",
        fontWeight: "light",
        boxShadow: "0 4px 20px grey",
      },
      backgroundColor: "transparent",
    }}
    inputProps={{ disableUnderline: false }}
    renderValue={(selected) => {
      if (selected === "") {
        return (
          <span
            style={{
              color: "#999999",
              fontFamily: "Montserrat-regular",
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
  <FormHelperText sx={{ color: "#ffffff" }}>{errors.color}</FormHelperText>
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
          bgcolor: "transparent", // Set the background color here
          color: "white",
          fontFamily: "Montserrat-bold",
          fontWeight: "bold",
          border: "4px solid white",
          // Add this line for white border
          "&:hover": {
            bgcolor: "transparent", // Darker shade for hover effect if needed
            border: "4px solid white", // Ensure border stays white on hover
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
      {Object.values(registrationData || {}).some(value => value) 
  ? "GUARDAR" 
  : isSuccess ? "Éxito" : "AMPLIAR A 48 HORAS Gratis"}
    


        {/* Corrected typo here */}
      </Button>
    </Box>
  );
};

export default ExpiryRegistrationForm;