import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { getLocalUserdata } from "services/auth/localStorageData";
import userServices from "services/httpService/userAuth/userServices";
import OtpInput from "react18-input-otp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import backgroundImage from "../../assets/img/otp.png";
import background from "../../assets/img/telephono.png";

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
              "@media (max-width: 342px)": {
                width: "30%", // Width for mobile screens
                padding: "50px",
                marginLeft: "25%", // Adjust padding for mobile
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
                left: 0, // Move it to the left
                top: 0, // Adjust top position as needed
                margin: "10px",
                "@media (max-width: 342px)": {
                  marginLeft: "125%", // Adjust padding for mobile
                }, // Add some margin if needed
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
                  fontSize: "2px", // Smaller font size for mobile
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
                  fontSize: "2px",
                  // Smaller font size for mobile
                },
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
                width: "60px",
                height: "60px",
                backgroundColor: "transparent",
                borderColor: "gray",
                color: "white",
                borderWidth: 1,
                borderRadius: 0,
                textAlign: "center",
                marginTop: "10px",
                fontSize: 24,
                "@media (max-width: 342px)": {
                  width: "40px", // Adjust width for mobile
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
              }}
              disabled={!otp}
              onClick={submitOtp}
            >
              ENVIAR
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default GetMobileNumber;
