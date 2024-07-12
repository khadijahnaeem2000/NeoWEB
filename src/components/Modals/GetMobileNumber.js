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

  const handleChangeOtp = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      // Only allow numeric input up to 6 digits
      setOtp(value);
    }
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
                      fontWeight: "bold",
                      fontFamily: '"Montserrat", sans-serif',
                      whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                    sx={{
                      "@media (max-width: 342px)": {
                        fontSize: "12px", // Smaller font size for mobile
                      },
                    }}
                  >
                    INTRODUCE EL CÓDIGO DE VERIFICACIÓN
                  </center>
                  <center
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontFamily: '"Montserrat", sans-serif',
                      whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                    sx={{
                      "@media (max-width: 342px)": {
                        fontSize: "12px",
                        // Smaller font size for mobile
                      },
                    }}
                  >
                    ENVIADO AL TELEFONO POR SMS
                  </center>

                  {/* Replace OtpInput with a single input field */}
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={handleChangeOtp}
                    style={{
                      width: "300px",
                      height: "60px",
                      backgroundColor: "white",
                      borderColor: "gray",
                      color: "black",
                      borderWidth: 1,
                      borderRadius: "10px", // Increased border radius for rounded corners
                      textAlign: "center",
                      fontSize: "24px",
                      marginTop: "10px",
                      "@media (max-width: 342px)": {
                        width: "200px", // Adjust width for mobile
                        height: "40px", // Adjust height for mobile
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
                      mt: 3,
                      background: "transparent",
                      fontWeight: "bold",
                      border: "4px solid white",
                      // Add this line for white border
                      "&:hover": {
                        bgcolor: "transparent", // Darker shade for hover effect if needed
                        border: "4px solid white", // Ensure border stays white on hover
                      },
                    }}
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
                  ¡BIENVENIDO/A AL CURSO DE
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
                  INGRESO A GUARDIA CIVIL!
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
                        color: "black", // Set input text color to white
                        backgroundColor: "#ffffff",
                        padding: "19px",
                        width: "150%",
                        justifyContent: "center",
                        textAlign: "center",
                        borderRadius: "2px",
                        fontWeight: 300, // Adjusted to semi-light, assuming fontWeight of 300 is semi-light
                        boxShadow: "0 4px 20px grey",
                        "&::placeholder": {
                          color: "black", // Set placeholder text color to white
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
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 2,
                    marginTop: "10%",
                    bgcolor: "transparent",
                    color: "white",
                    fontWeight: "bold",
                    border: "4px solid white",
                    // Add this line for white border
                    "&:hover": {
                      bgcolor: "transparent", // Darker shade for hover effect if needed
                      border: "4px solid white", // Ensure border stays white on hover
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