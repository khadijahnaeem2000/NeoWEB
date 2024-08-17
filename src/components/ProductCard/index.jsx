// src/ProductCard.js
import React from "react";
import {
  Paper,
  Grid,
  Box,
  Typography,
  Checkbox,
  Button,
  Modal,
} from "@mui/material";
import productosService from "services/httpService/Productos/productServices";
import { toast } from "react-toastify";
import { useState } from "react";
import ReusableModal from "components/Modal";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ProductCard = ({ item, handleCheckboxChange, getData }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Activate");

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

          if (response?.data?.value === "InActive") {
            setStatus("Desactivada");
          } else if (response?.data?.value === "Active") {
            setStatus("Activada");
          }

          localStorage.setItem("neoestudio", JSON.stringify(updatedData));
          dispatch({
            type: "User_Register_Success",
            payload: {
              ...getData,
              SubscriptionActivation: response?.data?.value,
            },
          });
        } else if (response?.data?.status === "Unsuccessful") {
          toast.error(response?.data?.message);
        }
        handleCloseModal();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in Inactie and active:", error);
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

  useEffect(() => {
    if (getData?.SubscriptionActivation === null) {
      setStatus("Activate");
    } else {
      if (getData?.SubscriptionActivation === "InActive") {
        setStatus("Desactivada");
      } else if (getData?.SubscriptionActivation === "Active") {
        setStatus("Activada");
      }
    }
  }, [getData?.SubscriptionActivation]);

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
                style={{ marginTop: "15px", marginLeft: "15px" }}
              />
              {item?.order === 1 && getData?.IsPaymentComplete === "YES" ? (
                <Checkbox
                  checked={true}
                  onChange={() => {
                    return toast.info("ya he comprado");
                  }}
                  style={{
                    position: "absolute",
                    top: -2,
                    left: -12,
                  }}
                />
              ) : (
                <Checkbox
                  onChange={() => {
                    handleCheckboxChange(item?.id);
                  }}
                  style={{
                    position: "absolute",
                    top: -2,
                    left: -12,
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
              variant="h6"
              sx={{
                fontSize: "22px",
              }}
            >
              {item?.price}€
            </Typography>

            {item?.order === 1 && (
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#636363", // Ensure no overflow
                }}
              >
                Expiración: {getData?.Payment_ExpiryDate} (Faltan{" "}
                {getData?.dias} días)
              </Typography>
            )}

            {item?.order === 1 && (
              <Typography
                sx={{
                  fontSize: "15px",
                  color: "#636363", // Ensure no overflow
                }}
              >
                Renovación:&nbsp;&nbsp;&nbsp;
                <Button
                  onClick={handleOpenModal}
                  // onClick={handleActiveProduct}
                  size="small"
                  variant="contained"
                  style={{
                    fontSize: "8px",
                    padding: "3px 8px",
                    backgroundColor: status === "Desactivada" ? "red" : "green",
                    color: "white",
                    marginLeft: "6px",
                  }}
                >
                  {status}
                </Button>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <ReusableModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={`CONFIRMACIÓN DE ${
          getData?.SubscriptionActivation === "Active" ? "BAJA" : "ACTIVAR"
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
              NO, salir
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
              {loading ? "espere por favor..." : "Sí"}
            </Button>
          </Box>
        }
      >
        <Typography variant="body1">
          {`¿Estás seguro/a que deseas ${
            getData?.SubscriptionActivation === "Active"
              ? "desactivar"
              : "activar"
          } el cobro
automático?`}
        </Typography>
      </ReusableModal>
    </Grid>
  );
};

export default ProductCard;
