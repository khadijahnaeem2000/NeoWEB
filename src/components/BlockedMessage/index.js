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
import {
  getLocalUserdata,
  updateLocalUserdata, // Assuming you have a function to update local storage
} from "../../services/auth/localStorageData";
import paymentImg from "../../assets/img/payment.png";
import whatsappImg from "../../assets/img/whatasp.png";

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

  const [selectedCity, setSelectedCity] = useState(""); // State for selected city
  const [cityCost, setCityCost] = useState(0); // State for city cost
  const [cities, setCities] = useState([]);
  const userdata = getLocalUserdata() || {}; // Default to an empty object if data is null
  const email = userdata?.email;
  const paylink = userdata?.paylink;
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <div
        className="content"
        style={{
          textAlign: "center",
          padding: "25px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", marginBottom: "20px", color: "#333" }}
        >
          Acceso Bloqueado
        </Typography>
        <Typography
          variant="body1"
          style={{ marginBottom: "30px", color: "#666" }}
        >
          Tu usuario "{email}" ha sido bloqueado. Por favor, realice el pago de
          la suscripción o contacte con soporte para solucionarlo
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px", // Space between images
            marginTop: "20px",
          }}
        >
          <a href={paylink} target="_blank" rel="noopener noreferrer">
            <img
              src={paymentImg}
              alt="Realizar pago"
              style={{
                padding: "10px",
                width: "250px",
                cursor: "pointer",
              }}
            />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=34621251720&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={whatsappImg}
              alt="Contact WhatsApp Support"
              style={{
                padding: "10px",
                width: "250px",
                cursor: "pointer",
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductosCarrito;
