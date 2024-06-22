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
      setShowSteps(2);
      onVerify(true);
      return;
    }
    if (
      isVerifiedData?.IsTelephoneverified === "YES" &&
      isVerifiedData?.IsRegistered === "YES"
    ) {
      return onVerify(false);
    }
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
          toast.success("OTP enviada a tu número de móvil");
          setShowSteps(1);
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
                    background: "#fff",
                    padding: "25px",
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <ArrowBackIcon
                    onClick={() => setShowSteps(0)}
                    fontSize="small"
                    sx={{ color: "black", cursor: "pointer" }}
                  />
                  <Typography>Ingrese la OTP</Typography>
                  <Button
                    sx={{
                      marginLeft: "auto",
                    }}
                    size="small"
                    variant="text"
                    onClick={handleSubmit}
                  >
                    New OPT
                  </Button>
                </Box>
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
                    width: "40px",
                    height: "40px",
                    backgroundColor: "white",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 0,
                    textAlign: "center",
                    fontSize: 24,
                  }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mb: 2, mt: 3 }}
                  disabled={!otp}
                  onClick={submitOtp}
                >
                  Enviar OTP
                </Button>
              </>
            )}

            {isVerifiedData?.IsTelephoneverified === "NO" && showSteps === 0 && (
              <Box
                style={{
                  background: "#fff",
                  padding: "25px",
                }}
              >
                <Typography>Ingresa número telefónico</Typography>

                <TextField
                  sx={{ mb: 1 }}
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  autoFocus
                  value={phoneNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+34</InputAdornment>
                    ),
                  }}
                  error={!!error}
                  helperText={error}
                  size="medium"
                  style={{
                    paddingBlock: 5,
                  }}
                />
                <Button
                  type="button"
                  disabled={!phoneNumber || submitMobileNumberLoading}
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mb: 2 }}
                  onClick={handleSubmit}
                >
                  Entregar
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
