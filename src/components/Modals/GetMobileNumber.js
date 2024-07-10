import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { getLocalUserdata } from "services/auth/localStorageData";
import userServices from "services/httpService/userAuth/userServices";
import OtpInput from "react18-input-otp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import background from "../../assets/img/telephono.png";
import backgroundImage from "../../assets/img/otp.png";

import { useNavigate } from "react-router-dom";
import ExpiryRegistrationForm from "components/ExpiryRegister";
const GetMobileNumber = ({ onVerify }) => {
  const data = getLocalUserdata();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerifiedData, setIsVerifiedData] = useState(null);
  const [showSteps, setShowSteps] = useState(0);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitMobileNumberLoading, setSubmitMobileNumberLoading] =
    useState(false);

  useEffect(() => {
    try {
      userServices
        .telephoneVerification(`TelephoneVerification?userid=${data?.id}`)
        .then((response) => {
          if (response.data.status === true) {
            localStorage.setItem(
              "registerData",
              JSON.stringify(response.data.data)
            );
            setIsVerifiedData(response.data.data);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          navigate("/");
        });
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {
    if (isVerifiedData?.IsTelephoneverified === "NO") {
      onVerify(true);
      setShowSteps(0);
      return;
    }
    if (isVerifiedData?.IsRegistered === "NO") {
      onVerify(false);
      return;
    }
    if (
      isVerifiedData?.IsTelephoneverified === "YES" &&
      isVerifiedData?.IsRegistered === "YES"
    ) {
      return onVerify(false);
    }
    // else {
    //   onVerify(false);
    // }
  }, [isVerifiedData?.IsTelephoneverified, isVerifiedData?.IsRegistered]);

  const getOtp = async (id, phoneNumber) => {
    try {
      const response = await userServices.commonPostService("/MobileOTP", {
        user_id: id,
        mobile: encodeURIComponent(phoneNumber),
      });
      if (response?.status == 200) {
        return response;
      }
      if (response?.status == 201) {
        return response;
      }
    } catch (error) {
      toast.error("Error al enviar el código.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data?.id) return;

    const phoneNumberPattern = /^\d+$/;
    if (phoneNumberPattern.test(phoneNumber)) {
      try {
        setSubmitMobileNumberLoading(true);
        const response = await getOtp(data?.id, phoneNumber);
        if (response) {
          if (response?.status == 200) {
            toast.success("OTP enviada a tu número de móvil");
            setShowSteps(1);
          } else {
            toast.error("El teléfono ya existe");
          }
        }
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setSubmitMobileNumberLoading(false);
      }
    } else {
      setError("Please enter a valid phone number (numbers only)");
    }
  };

  const handleLoginSuccess = () => {
    const loginTime = new Date().getTime();
    localStorage.setItem("loginTime", loginTime);
  };

  const submitOtp = async () => {
    try {
      if (otp?.length === 6) {
        const response = await userServices.commonPostService("/verifyOTP", {
          user_id: data?.id,
          mobileotp: otp,
        });

        if (response?.data?.status === 200) {
          setIsVerifiedData((prevState) => ({
            ...prevState,
            IsTelephoneverified: "YES",
          }));
          handleLoginSuccess();
        } else if (response?.data?.status === 100) {
          setIsVerifiedData((prevState) => ({
            ...prevState,
            IsTelephoneverified: "NO",
          }));
          toast.error("Usuario no verificado, ingrese la OTP correcta.");
        }
      }
    } catch (error) {
      toast.error("Error al verificar ahora mismo.");
    } finally {
      setOtp("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
      setError("");
    }
  };

  const handleChangeOtp = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  return (
    <>
      {!isVerifiedData ? (
        <Box
          style={{
            background: "#fff",
            padding: "25px",
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginInline: "50px",
          }}
        >
          <CircularProgress color="primary" />
          <Typography
            style={{
              color: "#067acd",
            }}
            gutterBottom
            align="center"
          >
            Espere por favor...
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ mt: 1 }}>
            {isVerifiedData?.IsTelephoneverified === "NO" && showSteps === 1 && (
              <>
                <Box
                  style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "100px",
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                    width: "100%", // Default width
                    "@media (max-width: 360px)": {
                      width: "70%", // Width for mobile screens
                      margin: "15%", // Adjust padding for mobile
                    },
                  }}
                >
                  <ArrowBackIcon
                    onClick={() => setShowSteps(0)}
                    y
                    fontSize="large"
                    sx={{
                      color: "white",
                      cursor: "pointer",
                      position: "absolute",
                      left: 1, // Move it to the left
                      top: 0, // Adjust top position as needed
                      margin: "10px",
                      "@media (max-width: 360px)": {
                        left: 2,
                    },
                      // Add some margin if needed
                      
                    }}
                  />
                  <center
                    style={{
                      color: "white",
                      fontSize: "150%",
                      fontFamily: '"Anton", sans-serif',
                      whiteSpace: "nowrap", // Prevent text wrapping
                      marginBottom: "0px",
                      marginTop: "-20px",
                    }}
                  >
                    INTRODUCE EL CÓDIGO DE VERIFICACIÓN
                  </center>
                  <center
                    style={{
                      color: "white",
                      fontSize: "150%",
                      fontFamily: '"Anton", sans-serif',
                      whiteSpace: "nowrap", // Prevent text wrapping
                      marginTop: "-15px",
                    }}
                  >
                    ENVIADO AL TELEFONO POR SMS
                  </center>
                  <Button
                    sx={{
                      color: "white",
                    }}
                    size="small"
                    variant="text"
                    onClick={handleSubmit}
                  >
                    Nueva OTP
                  </Button>

                  <OtpInput
                    value={otp}
                    onChange={handleChangeOtp}
                    numInputs={6}
                    separator={<span>-</span>}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    inputStyle={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "transparent",
                      borderColor: "gray",
                      color: "white",
                      borderWidth: 1,
                      borderRadius: 0,
                      textAlign: "center",
                      marginTop: "10px",
                      fontSize: 24,
                      "@media (max-width: 360px)": {
                        width: "50px",
                        height: "50px",
                        fontSize: "16px", // Adjust font size for mobile
                      },
                    }}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{
                      mb: 2,
                      marginTop: "10%",
                      bgcolor: "transparent",
                      color: "white",
                      fontSize: "25px",
                      fontFamily: '"Anton", sans-serif',
                      "&:hover": {
                        bgcolor: "transparent", // Darker shade for hover effect if needed
                      },
                    }}
                    disabled={!otp}
                    onClick={submitOtp}
                  >
                    ENVIAR
                  </Button>
                </Box>
              </>
            )}

            {isVerifiedData?.IsTelephoneverified === "NO" && showSteps === 0 && (
              <Box
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  padding: "100px",
                }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  position: "relative",
                  width: "100%", // Default width
                  "@media (max-width: 360px)": {
                    width: "70%", // Width for mobile screens
                    margin: "15%", // Adjust padding for mobile
                  },
                }}
              >
                <center
                  style={{
                    color: "white",
                    fontSize: "150%",
                    fontFamily: '"Anton"',
                    marginBottom: "0",
                    whiteSpace: "nowrap", // Prevent text wrapping
                  }}
                >
                  ¡BIENVENIDO/A AL CURSO DE INGRESO
                </center>
                <center
                  style={{
                    color: "white",
                    fontSize: "150%",
                    fontFamily: '"Anton", sans-serif',
                    whiteSpace: "nowrap", // Prevent text wrapping
                    marginTop: "-15px",
                  }}
                >
                  A GUARDIA CIVIL!
                </center>
                <center
                  style={{
                    color: "white",
                    marginTop: "1px",
                    fontFamily: '"Montserrat", sans-serif',
                   
                    
                  
                    whiteSpace: "nowrap", // Prevent text wrapping
                  }}
                >
                  Ahora verifica tu número de teléfono
                </center>
                <center>
                  <TextField
                    sx={{
                      "& .MuiFormLabel-root": {
                        color: "#ffffff",
                        marginLeft: "9px",
                        marginTop: "-3%",
                      },
                      "& .MuiInputBase-input": {
                        color: "#ffffff", // Set input text color to white
                        backgroundColor: "transparent",
                        padding: "19px",
                        width: "150%",
                        justifyContent: "center",
                        textAlign: "center",
                        borderRadius: "2px",
                        fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                        boxShadow: "0 4px 20px grey",
                        "&::placeholder": {
                          color: "#FFFFFF", // Set placeholder text color to white
                          fontFamily: "serif",
                          fontSize: "16px",
                          fontWeight: 300, // Adjusted to semi-light
                        },
                        "@media (max-width: 360px)": {
                          width: "180%",
                        },
                      },
                      "& .MuiInputBase-root": {
                        borderColor: "#ffffff", // Set border color to white
                        "&:focus-within": {
                          boxShadow: "0 0 10px black",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ffffff", // Set the outline border color to white
                        },
                        "&:hover fieldset": {
                          borderColor: "#ffffff", // Set the outline border color to white on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ffffff", // Set the outline border color to white when focused
                        },
                      },
                      "& .MuiInputAdornment-root": {
                        color: "#ffffff", // Set the color of the InputAdornment
                      },
                    }}
                    required
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <span style={{ color: "#ffffff" }}>+34</span>
                        </InputAdornment>
                      ),
                    }}
                    error={!!error}
                    helperText={error}
                    size="medium"
                    style={{
                      paddingBlock: 8,
                    }}
                  />
                </center>

                <Button
                  type="button"
                  disabled={!phoneNumber || submitMobileNumberLoading}
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    marginTop: "10%",
                    bgcolor: "transparent",
                    color: "white",
                    fontSize: "25px",
                    fontFamily: '"Anton", sans-serif',
                    "&:hover": {
                      bgcolor: "transparent", // Darker shade for hover effect if needed
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>
              </Box>
            )}
          </Box>
          {isVerifiedData?.IsRegistered === "NO" && showSteps === 2 && (
            <ExpiryRegistrationForm
              setIsVerifiedData={setIsVerifiedData}
              isVerifiedData={isVerifiedData}
              onVerify={onVerify}
            />
          )}
        </>
      )}
    </>
  );
};

export default GetMobileNumber;