// src/ShoppingCart.js
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Checkbox,
  Box,
  TextField,
  CssBaseline,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import productosService from "services/httpService/Productos/productServices";
import "./style.css";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard";
import { useSelector } from "react-redux";
import ExpiryRegistrationForm from "components/ExpiryRegister";

const ProductosCarrito = () => {
  const data = useSelector((state) => state.userInfo.userRegister.success);
  const getData = JSON.parse(localStorage.getItem("neoestudio"));

  const [loading, setLoading] = useState(false);
  const [applyCouponLoading, setApplyCouponLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponPercent, setCouponPercent] = useState(0);

  const [isVerifiedData, setIsVerifiedData] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleCheckboxChange = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getProductLists = async () => {
    try {
      setLoading(true);
      const response = await productosService.getProductos("/productslist");
      if (response?.data?.status === "Successful") {
        let productsWithQuantity = response?.data?.data.map((product) => ({
          ...product,
          quantity: 1,
          checked: product?.order === 1 ? true : false,
        }));
        if (getData?.IsPaymentComplete === "YES") {
          productsWithQuantity = productsWithQuantity?.filter(
            (product) => product?.order === 1
          );
        }
        setLoading(false);
        setItems(productsWithQuantity);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error al obtener la lista de productos.");
      console.error("Error fetching product list:", error);
    }
  };

  const applyCouponPercentage = (item, price) => {
    if (item?.order === 1 && couponPercent > 0) {
      const disAmount = price * (couponPercent / 100);
      return price - disAmount;
    } else {
      return price;
    }
  };

  const getTotalPrice = useMemo(() => {
    return (item) => {
      return applyCouponPercentage(item, item.price * item.quantity);
    };
  }, [couponPercent]);

  const totalSum = useMemo(() => {
    return items
      ?.filter((item) => item?.checked)
      .reduce((total, item) => total + getTotalPrice(item), 0);
  }, [items, getTotalPrice]);

  useEffect(() => {
    getProductLists();
  }, []);

  const handleCheckout = async () => {
    try {
      if (getData) {
        const checkedItemIds = items
          .filter((item) => item.checked)
          .map((item) => item?.id);

        const queryString = `ids=${`${JSON.stringify(checkedItemIds)}`}`;
        const response = await productosService.buyProducts(
          `/paymentsubscriptionplan2024?email=${getData?.email}&${queryString}&coupon=${coupon}`
        );

        if (response?.data?.status === "Successfull") {
          window.location.replace(response?.data?.data);
        }
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const isAnyItemChecked = useMemo(() => {
    return items.some((item) => item.checked);
  }, [items]);

  const applyCoupon = async () => {
    try {
      setApplyCouponLoading(true);
      const response = await productosService.applyCoupon("CheckCoupon", {
        coupon: coupon,
        userid: getData?.id,
      });
      if (response.data?.status === "Succesfull") {
        setCouponPercent(Number(response.data?.percentage));
        toast.success("¡Éxito! Cupón aplicado");
      } else if (response.data?.status === "Unsuccesfull") {
        toast.error(response.data?.error);
      }

      setApplyCouponLoading(false);
    } catch (error) {
      setApplyCouponLoading(false);
      console.log("error: ", error);
      return error;
    }
  };

  useEffect(() => {
    if (!isVerifiedData) {
      setIsVerifiedData(data);
    }
  }, [data]);

  const showRegForm = (show) => {
    setShowRegister(show);
  };

  return (
    <div className="flex flex-col">
      <div style={{ marginTop: "1%", marginLeft: "2%", marginRight: "2%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent:
              getData?.IsRegistered === "NO" ? "space-between" : "center",
            alignItems: "center",
          }}
        >
          {getData?.IsRegistered === "NO" && <div className="empty-div"></div>}
          <Typography
         style={{
          margin : '0px'
         }}
            variant="h4"
            gutterBottom
          >
            Tienda
          </Typography>

          {getData?.IsRegistered === "NO" && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ marginBlock: 2 }}
              onClick={() => {
                setShowRegister(true);
              }}
            >
              Registrarse
            </Button>
          )}
        </Box>
        {loading === true ? (
          <Box sx={{ display: "flex", justifyContent: "center" }} width="100%">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <CssBaseline />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  {items?.length > 0 &&
                    items?.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        handleCheckboxChange={handleCheckboxChange}
                        getData={getData}
                      />
                    ))}
                </Grid>
              </Grid>

              {items?.length > 0 && getData?.IsPaymentComplete === "NO" && (
                <Grid item xs={12} sm={4}>
                  <TableContainer
                    style={{ marginBlock: "20px" }}
                    component={Paper}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: "80%" }}>
                            Nombre del producto o servicio
                          </TableCell>
                          <TableCell align="center" style={{ width: "10%" }}>
                            Cantidad
                          </TableCell>
                          <TableCell align="right" style={{ width: "10%" }}>
                            Precio
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {items
                          ?.filter((item) => item?.checked)
                          .map((item) => (
                            <TableRow key={item.id}>
                              <TableCell component="th" scope="row">
                                {item.name}
                              </TableCell>
                              <TableCell align="center">
                                {item?.quantity}
                              </TableCell>
                              <TableCell align="right">
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      textDecoration:
                                        couponPercent > 0 && item?.order === 1
                                          ? "line-through"
                                          : "",
                                      textDecorationColor:
                                        couponPercent > 0 && item?.order === 1
                                          ? "red"
                                          : "",
                                    }}
                                    variant="body2"
                                  >
                                    {item?.price * item?.quantity} €
                                  </Typography>
                                  {couponPercent > 0 && item?.order === 1 && (
                                    <Typography
                                      style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                      variant="body2"
                                      gutterBottom
                                    >
                                      {applyCouponPercentage(
                                        item,
                                        item.price * item.quantity
                                      )}{" "}
                                      €
                                    </Typography>
                                  )}
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell colSpan={2} align="right">
                            Suma total
                          </TableCell>
                          <TableCell align="right">
                            {totalSum.toFixed(2)}€
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            {couponPercent > 0 ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 2,
                                  justifyContent: "start",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                  variant="subtitle1"
                                >
                                  Cupón aplicado:
                                </Typography>
                                <Chip
                                  color="success"
                                  label={coupon}
                                  variant="outlined"
                                  onDelete={() => {
                                    setCoupon("");
                                    setCouponPercent(0);
                                  }}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: { md: "row" },
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                  variant="subtitle2"
                                >
                                  Cupón:&nbsp;&nbsp;
                                </Typography>
                                <TextField
                                  fullWidth
                                  placeholder="Código descuento"
                                  value={coupon}
                                  onChange={(event) => {
                                    setCoupon(event.target.value);
                                  }}
                                  variant="outlined"
                                  InputLabelProps={{
                                    style: {
                                      fontSize: "15px",
                                      width: "100%",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      marginLeft: "7px",
                                    },
                                  }}
                                  sx={{
                                    width: "70%",
                                    // Adjust the width as per your requirement
                                  }}
                                />

                                {coupon && (
                                  <Button
                                    disabled={applyCouponLoading}
                                    style={{ marginLeft: 10 }}
                                    variant="contained"
                                    color="info"
                                    onClick={applyCoupon}
                                    size="small"
                                  >
                                    {applyCouponLoading
                                      ? "Espera..."
                                      : "Aplicar"}
                                  </Button>
                                )}
                              </Box>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button
                    disabled={!isAnyItemChecked}
                    style={{ margin: "10px auto", width: "100%" }}
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                  >
                    COMPRAR
                  </Button>
                </Grid>
              )}
            </Grid>
          </>
        )}

        {isVerifiedData && showRegister && (
          <div className="overlay">
            <div className="popup">
              <ExpiryRegistrationForm
                isVerifiedData={isVerifiedData}
                setIsVerifiedData={setIsVerifiedData}
                onVerify={showRegForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductosCarrito;
