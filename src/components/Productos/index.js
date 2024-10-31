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
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import productosService from "services/httpService/Productos/productServices";
import "./style.css";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard";
import { useSelector } from "react-redux";
import ExpiryRegistrationForm from "components/ExpiryRegister";
import userServices from "services/httpService/userAuth/userServices";
import {
  getLocalUserdata,
  updateLocalUserdata, // Assuming you have a function to update local storage
} from "../../services/auth/localStorageData";
import BlockedMessage from "../BlockedMessage";

const ProductosCarrito = () => {
  const data = useSelector((state) => state.userInfo.userRegister.success);
  const getData = JSON.parse(localStorage.getItem("neoestudio"));
  const datatwo = getLocalUserdata() || {};

  const [loading, setLoading] = useState(false);
  const [applyCouponLoading, setApplyCouponLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponPercent, setCouponPercent] = useState(0);

  const [isVerifiedData, setIsVerifiedData] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const [selectedCity, setSelectedCity] = useState(""); // State for selected city
  const [cityCost, setCityCost] = useState(0); // State for city cost
  const [cities, setCities] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);

  const fetchCities = async () => {
    try {
      const cityResponse = await fetch(
        "https://neoestudio.net/api/getAllProductShipping"
      );
      const cityData = await cityResponse.json();
      console.log("Fetched city data:", cityData); // Debugging line

      if (cityData?.status === "success") {
        setCities(cityData.data);

        // Automatically select the last city by default
        const lastCity = cityData.data[cityData.data.length - 1];
        setSelectedCity(lastCity.CityName);
        setCityCost(lastCity.Cost);
      } else {
        console.log("Error in fetched city data:", cityData);
      }
    } catch (error) {
      toast.error(error);
      console.error("Error fetching cities:", error);
    }
  };

  // Fetch city data and select the last city by default
  useEffect(() => {
    fetchCities();
  }, []);

  
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
          checked: false,
        }));
        // if (getData?.IsPaymentComplete === "YES") {
        //   productsWithQuantity = productsWithQuantity?.filter(
        //     (product) => product?.order === 1
        //   );
        // }
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
    return (
      items
        ?.filter((item) => item?.checked)
        .reduce((total, item) => total + getTotalPrice(item), 0) + cityCost
    ); // Add city cost
  }, [items, getTotalPrice, cityCost]);

  useEffect(() => {
    getProductLists();
  }, []);

  const handleCheckout = async () => {
    try {
      if (getData) {
        const checkedItemIds = items
          .filter((item) => item.checked)
          .map((item) => item?.id);

        const queryString = `ids=${`${JSON.stringify(
          checkedItemIds
        )}`}&cityCost=${cityCost}&coupon=${coupon}`;

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
    setShowRegister(true);
    if (!isVerifiedData) {
      setIsVerifiedData(data);
    }
  }, [data]);

  const showRegForm = (show) => {
    setShowRegister(show);
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    console.log("Selected city:", selectedCityName); // Debugging line
    setSelectedCity(selectedCityName);

    const city = cities.find((city) => city.CityName === selectedCityName);
    console.log("Selected city data:", city); // Debugging line
    setCityCost(city ? city.Cost : 0);
  };

  const shouldShowCityDropdown = useMemo(() => {
    const firstItemSelected = items[0]?.checked;
    const anyOtherItemSelected = items.slice(1).some((item) => item.checked);

    return (firstItemSelected && anyOtherItemSelected) || anyOtherItemSelected;
  }, [items]);

  useEffect(() => {
    // Fetch user status and update isBlocked
    const fetchUserStatus = async () => {
      try {
        const response = await userServices.commonPostService("/user", {
          id: datatwo?.id,
        });
        if (response.status === 200) {
          if (response.data.is_block === true) {
            setIsBlocked(true);
          } else if (response.data.data.field1x === "Bloquear") {
            setIsBlocked(true); // Update state to block the user
          } else {
            setIsBlocked(false);
            if (
              response.data.data.IsRegistered == "NO" &&
              response.data.data.IsTelephoneverified == "YES"
            ) {
              setShowRegister(true);
              console.log("SUCCESS");
              console.log(response.data);
            } else {
              console.log("SUCCESS else");
              console.log(response.data);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();
  }, [datatwo?.id]);
  if (isBlocked) {
    return <BlockedMessage />;
  }
  return (
    <div className="flex flex-col">
      <div style={{ marginTop: "1%", marginLeft: "2%", marginRight: "2%" }}>
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between", // Center alignment for all
    alignItems: "center",
    flexWrap: { xs: "wrap", sm: "nowrap" },
  }}
>
  <div className="empty-div"></div> {/* This div can remain for layout purposes */}
  <Typography style={{ margin: "0px" }} variant="h4" gutterBottom>
    Tienda
  </Typography>

  <Button
    type="button"
    variant="contained"
    color="primary"
    sx={{
      marginBlock: 2,
      width: { xs: "100%", sm: "auto" },
    }}
    onClick={() => {
      setShowRegister(true);
    }}
  >
       Datos Registro Modificar
  </Button>
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

              {items?.length > 0 && (
                <Grid item xs={12} sm={4}>
                  <TableContainer
                    style={{ marginBlock: "20px", marginTop: "2px" }}
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
                        {selectedCity && (
                          <>
                            <TableRow>
                              <TableCell colSpan={2} align="right">
                                Coste de envío ({selectedCity})
                              </TableCell>
                              <TableCell align="right">
                                {cityCost.toFixed(2)} €
                              </TableCell>
                            </TableRow>
                          </>
                        )}
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
                                  flexDirection: { xs: "column", sm: "row" }, // Adjusted for mobile
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
                                      width: "200px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      marginLeft: "7px",
                                    },
                                  }}
                                  sx={{
                                    width: { xs: "100%", sm: "70%" }, // Full width on mobile
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

                        {shouldShowCityDropdown && (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on larger screens
                                  alignItems: {
                                    xs: "center",
                                    sm: "flex-start",
                                  }, // Center on mobile, start on larger screens
                                  gap: 2,
                                  justifyContent: {
                                    xs: "center",
                                    sm: "flex-start",
                                  }, // Center on mobile, start on larger screens
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    marginLeft: { xs: 0, sm: "3px" }, // Adjust margin based on screen size
                                  }}
                                  variant="subtitle2"
                                >
                                  Ciudad:
                                </Typography>
                                <Select
                                  value={selectedCity}
                                  onChange={handleCityChange}
                                  fullWidth
                                  variant="outlined"
                                  sx={{
                                    fontSize: "15px",
                                    width: {
                                      xs: "100%", // Full width on mobile
                                      sm: "70%",
                                    }, // Full width on mobile, fixed width on larger screens
                                    height: "35px",
                                    textAlign: "left", // Align text to the left
                                    "& .MuiSelect-select": {
                                      justifyContent: "flex-start", // Start the text from the left
                                    },
                                    color: "#818589",
                                  }}
                                >
                                  {cities.length > 0 ? (
                                    cities.map((city) => (
                                      <MenuItem
                                        key={city.CityName}
                                        value={city.CityName}
                                      >
                                        {city.CityName}
                                      </MenuItem>
                                    ))
                                  ) : (
                                    <MenuItem disabled>
                                      No cities available
                                    </MenuItem>
                                  )}
                                </Select>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
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

{showRegister && (
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
