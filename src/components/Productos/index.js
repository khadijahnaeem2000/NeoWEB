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


const ProductosCarrito = () => {
  const [loading, setLoading] = useState(false);
  const getData = JSON.parse(localStorage.getItem("neoestudio"));
  const [items, setItems] = useState([]);

  const handleIncrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

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

  const getTotalPrice = useMemo(() => {
    return (item) => item.price * item.quantity;
  }, []);

  const totalSum = useMemo(() => {
    return items
      ?.filter((item) => item?.checked)
      .reduce((total, item) => total + getTotalPrice(item), 0);
  }, [items]);

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
        console.log("queryString: ", queryString);
        const response = await productosService.buyProducts(
          `/paymentsubscriptionplan2024?email=${getData?.email}&${queryString}`
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

  return (
    <div className="flex flex-col">
      <div style={{ marginTop: "3%", marginLeft: "2%", marginRight: "2%" }}>
        <center>
          <Typography variant="h4" gutterBottom>
            Tienda
          </Typography>
        </center>
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
                            Nombre del árticulo
                          </TableCell>
                          <TableCell align="center" style={{ width: "10%" }}>
                            Cantidad
                          </TableCell>
                          <TableCell align="right" style={{ width: "10%" }}>
                            Precio total
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
                                {getTotalPrice(item)}€
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
                            <TextField
                              fullWidth
                              label="Código descuento"
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
                    Pagar
                  </Button>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductosCarrito;
