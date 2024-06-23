// src/ShoppingCart.js
import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import productosService from "services/httpService/Productos/productServices";
import "./style.css";
import { useMemo } from "react";
const ProductosCarrito = () => {
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
      const response = await productosService.getProductos("/productslist");

      if (response?.data?.status === "Successful") {
        let productsWithQuantity = response?.data?.data.map((product) => ({
          ...product,
          quantity: 1,
          checked:
            product?.order === 1 ? true : false,
        }));

        if (getData?.IsPaymentComplete === "YES") {
          productsWithQuantity = productsWithQuantity?.filter(
            (product) => product?.order === 1
          );
        }
        setItems(productsWithQuantity);
      }
    } catch (error) {
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
        console.log({ checkedItemIds });

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
    // const checkedItems = items.filter((item) => item.checked);
    // const totalPrice = checkedItems.reduce((total, item) => {
    //   return total + item.price * item.quantity;
    // }, 0);
    // console.log("totalPrice: ", totalPrice);
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
        <CssBaseline />
        <Grid container spacing={3}>
          {items?.length > 0 &&
            items?.map((item) => (
              <Grid item xs={12} key={item?.id}>
                <Paper elevation={3} style={{ padding: 16 }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Box position="relative" display="inline-block">
                        <img
                          src={item?.photo}
                          alt={item?.name}
                          className="product-image"
                        />
                        <Checkbox
                          checked={item?.checked || false}
                          onChange={() => {
                            if (
                              item?.order === 1
                            ) {
                              return;
                            } else {
                              handleCheckboxChange(item?.id);
                            }
                          }}
                          style={{
                            position: "absolute",
                            top: -12,
                            left: -28,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Box display="flex" justifyContent="space-between">
                        <Box display="flex" gap={2}>
                          <Typography variant="h6">{item?.name}</Typography>{" "}
                          {getData?.IsPaymentComplete === "YES" &&
                            item?.order === 1 && (
                              <Chip
                                size="small"
                                color="success"
                                label={item?.status}
                                variant="filled"
                              />
                            )}
                        </Box>

                        <Typography variant="h6">${item?.price}</Typography>
                      </Box>
                      <span
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></span>
                      

                      <Chip
                        marginTop="10px"
                        size="small"
                        color="default"
                        label={getData?.Payment_ExpiryDate}
                        variant="filled"
                      />

                      <Box
                        display="flex"
                        gap={2}
                        alignItems="center"
                        className="product-cart-price"
                      >
                        <IconButton
                          disabled={true}
                          sx={{
                            border: "1px solid",
                            borderColor: "primary.main",
                            padding: "3px",
                          }}
                          onClick={() => handleDecrement(item?.id)}
                        >
                          <Remove />
                        </IconButton>
                        <Typography variant="body1" color="green">
                          {item?.quantity}
                        </Typography>
                        <IconButton
                          disabled={true}
                          sx={{
                            border: "1px solid",
                            borderColor: "primary.main",
                            padding: "3px",
                          }}
                          onClick={() => handleIncrement(item?.id)}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
        </Grid>
        {items?.length > 0 && (
          <TableContainer style={{ marginBlock: "20px" }} component={Paper}>
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
                      <TableCell align="center">{item?.quantity}</TableCell>
                      <TableCell align="right">
                        ${getTotalPrice(item)}
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    Suma total
                  </TableCell>
                  <TableCell align="right">${totalSum.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
          disabled={!isAnyItemChecked}
          style={{ marginBlock: "10px", float: "right" }}
          variant="contained"
          color="primary"
          onClick={handleCheckout}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
};

export default ProductosCarrito;
