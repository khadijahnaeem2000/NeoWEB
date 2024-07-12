// src/ProductCard.js
import React, { useState, useMemo } from "react";
import {
  Paper,
  Grid,
  Box,
  Typography,
  Checkbox,
  Button,
} from "@mui/material";
import productosService from "services/httpService/Productos/productServices";
import { toast } from "react-toastify";
import ReusableModal from "components/Modal";

const ProductCard = ({ item, handleCheckboxChange, getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(getData?.SubscriptionActivation || '');

  const handleActiveProduct = async () => {
    try {
      if (getData) {
        if (getData?.SubscriptionActivation === null) {
          toast.error("Activar producto primero");
          handleCloseModal();
          return;
        }
        setLoading(true);
        const response = await productosService.activeAndInactiveProduct(
          "SubscriptionActivation",
          {
            userid: getData?.id,
            status:
              getData?.SubscriptionActivation === "Active"
                ? "InActive"
                : "Active",
          }
        );
        if (response?.data?.status === "Successfull") {
          toast.success(`Producto ${response?.data?.value} con éxito`);
          const updatedData = {
            ...getData,
            SubscriptionActivation: response?.data?.value,
          };

          localStorage.setItem("neoestudio", JSON.stringify(updatedData));
          setSubscriptionStatus(response?.data?.value); // Update subscription status
          console.log('Subscription status updated:', response?.data?.value); // Log to verify
        } else if (response?.data?.status === "Unsuccessful") {
          toast.error(response?.data?.message);
        }
        handleCloseModal();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in Inactive and active:", error);
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const subscriptionStatusText = useMemo(() => {
    return subscriptionStatus === null
      ? "Activate"
      : subscriptionStatus === "Active"
      ? "Activada"
      : "Desactivada";
  }, [subscriptionStatus]);

  return (
    <Grid item xs={12} sm={6} key={item?.id}>
      <Paper elevation={3} style={{ padding: 12 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Box position="relative" display="inline-block">
              <img
                src={item?.photo}
                alt={item?.name}
                className="product-image"
                style={{ marginTop: "15px",marginLeft: "12px" }}
              />
              {getData?.IsPaymentComplete === "NO" && (
                <Checkbox
                  checked={item?.checked || false}
                  onChange={() => {
                    if (item?.order === 1) {
                      return;
                    } else {
                      handleCheckboxChange(item?.id);
                    }
                  }}
                  style={{
                    position: "absolute",
                    top: -2,
                    left: -15,
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" gap={2}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#141414", // Use numeric value for fontWeight
                  }}
                >
                  {item?.name}
                </Typography>{" "}
              </Box>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontSize: "22px",
                fontFamily: 'Montserrat-bold',
              }}
            >
              {item?.price}€
            </Typography>

            {item?.order === 1 && (
              <Typography
                sx={{
                  fontSize: "15px",
                  color: "#636363", // Ensure no overflow
                }}
              >
                Expiración: {getData?.Payment_ExpiryDate} (Faltan {getData?.dias} días)
              </Typography>
            )}

            {item?.order === 1 && (
              <Typography
                sx={{
                  fontSize: "15px",
                  color: "#636363", // Ensure no overflow
                }}
              >
                Renovación:{" "}
                <Button
                  onClick={handleOpenModal}
                  size="small"
                  variant="contained"
                  style={{
                    fontSize: "8px",
                    padding: "3px 8px",
                    backgroundColor: subscriptionStatusText === 'Desactivada' ? 'red' : 'green',
                    color: "white",
                  }}
                >
                  {subscriptionStatusText}
                </Button>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <ReusableModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={`Confirm ${
          subscriptionStatus === "Active"
            ? "De Activar"
            : "Activar"
        }`}
        footer={
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              size="small"
              onClick={handleCloseModal}
              sx={{
                backgroundColor: "red",
                "&:hover": { backgroundColor: "darkred" },
              }}
            >
              NO
            </Button>
            <Button
              disabled={loading}
              variant="contained"
              size="small"
              onClick={handleActiveProduct}
              sx={{
                backgroundColor: "green",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              {loading ? "espere por favor..." : "YES"}
            </Button>
          </Box>
        }
      >
        <Typography variant="body1">
          {`Está seguro? tú quieres ${
            subscriptionStatus === "Active"
              ? "De Activar"
              : "Activar"
          }`}
        </Typography>
      </ReusableModal>
    </Grid>
  );
};

export default ProductCard;
