import { differenceInSeconds } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import MyCalendar from "components/calendar/Calendar";
import Popup from "./Popup/Popup"; 
import useStyles from "./styles";
import "./styles.css";
import profilepic from "../../assets/img/images/layer_25.webp";
import defaultrank from "../../assets/img/images/Empleo_cabo.webp";
import SelectButton from "./SelectButton/SelectButton";
import userServices from "services/httpService/userAuth/userServices";
import tiempo from "../../assets/img/images/Tiempo.png";
import medallas from "../../assets/img/images/Medallas.png";
import percentil from "../../assets/img/images/Porcentaje2.png";
import puntos from "../../assets/img/images/Recurso3Pestaaprueba.png";

import AudioLibro from "components/AudioLibro/AudioLibro";
import ProductosCarrito from "components/Productos";
import BlockedMessage from "../BlockedMessage";
import {
  getLocalUserdata,
  updateLocalstoragepic,
  updateLocalstoragetime,
} from "../../services/auth/localStorageData";

const Homepage = () => {
  const classes = useStyles();
  const data = getLocalUserdata();
  let temp = differenceInSeconds(new Date(data?.expiry_date), new Date());
  const [userInfo, setUserInfo] = useState([]);
  const [photo, setPhoto] = useState("");
  const [time, setTime] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [hours, setHours] = useState(
    Number(
      Math.floor(temp / 3600)
        .toString()
        .padStart(2, "0")
    ) + Number(5)
  );
  const [minutes, setMinutes] = useState(
    Math.floor((temp % 3600) / 60)
      .toString()
      .padStart(2, "0")
  );
  const [seconds, setSeconds] = useState(
    Math.floor(temp % 60)
      .toString()
      .padStart(2, "0")
  );
  const [logout, setLogout] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [pruebaPopUpText, setPruebaPopUpText] = useState(''); // State for the popup text

  // Function to handle button clicks in Popup
  const handlePopupButtonClick = (buttonNumber) => {
    console.log(`Button ${buttonNumber} clicked!`);
    // You can add more logic based on which button is clicked
    setShowPopup(false); // Close the popup after button click
  };

  // Check screen width for mobile view
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    userServices
      .commonPostService("/user", { id: data?.id })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.IsBlocked === "True") {
            console.log(response);
            if (response.data.is_block === true) {
              setIsBlocked(true); // Update blocked status
            }
          } else {
            if (response.data.data.smartcount >= 3) {
              toast.error(
                "¡Se han registrado 3 o más dispositivos! Si más de una persona usa la cuenta, su cuenta será bloqueada."
              );
            }

            if (response.data.data.expiry_date !== null) {
              setShowTimer(true);
            }
            setUserInfo(response.data);
            setPhoto(response.data.data.photo);
            setPruebaPopUpText(response.data.data.PruebaPopUpText); // Set the popup text from API response
            updateLocalstoragetime(response.data.time);
            updateLocalstoragepic(response.data.data.photo);
            setTime(response.data.time);
          }
        } else {
          console.log("Cannot get updated info");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data?.id]); // Add data.id as a dependency

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevState) => prevState - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(interval);
            setLogout(true);
            localStorage.clear();
            toast.error(
              "Su prueba de un día ha expirado, compre un plan para continuar."
            );
          } else {
            setHours((prevState) => prevState - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes((prevState) => prevState - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes, hours]); // Add seconds, minutes, and hours as dependencies

  if (isBlocked) {
    return <BlockedMessage />;
  }

  return (
    <div
      className={classes.container}
      style={{ display: "flex", flexDirection: "column", position: "relative" }} // Added position: relative
    >
            
{showPopup && (
  <div className="popup-overlay">
    <Popup
      message={{
        body: "¿Quieres utilizar la app para tener una mejor experiencia desde el smartphone?"
      }}
      onClose={() => setShowPopup(false)}
    />
  </div>
)}
      {/* Homepage Content */}
      <div className={classes.wrapper}>
        {/* Profile Picture */}
        <div className={classes.desktopItem}>
          <img
            id="profile_pic"
            alt="Profile_picture"
            src={
              data?.photo != null
                ? `https://neoestudio.net/userImage/${data?.photo}`
                : profilepic
            }
            className="lg:h-40 md:h-36 sm:h-32 h-28"
          />
          <div className="text-center fontSize" style={{ marginTop: "2%" }}>
            <SelectButton />
          </div>
        </div>

        {/* Rank Image */}
        <div className={classes.desktopItem}>
          <img
            alt="Rank_image"
            src={
              data?.rank_image != null
                ? `https://neoestudio.net/${data?.rank_image}`
                : defaultrank
            }
            className="lg:h-40 md:h-36 sm:h-32 h-28"
          />
          <h2 className={`${classes.font} text-center fontSize`}>
            {userInfo?.data?.rank_name != null ? userInfo.data.rank_name : "-"}
          </h2>
          <div className="text-center fontSize">
            {userInfo?.data?.userName != null ? userInfo.data.userName : "-"}
          </div>
        </div>
        
        {/* Other Desktop Items */}
        <div className={classes.desktopItem}>
          <img
            alt="Tiempo"
            src={require("assets/img/images/Tiempo.webp").default}
            srcSet={tiempo}
            className="lg:h-40 md:h-36 sm:h-32 h-28"
          />
          <h2 className={`${classes.font} text-center fontSize`}>
            {time != null ? time : 0} h
          </h2>
          <div className="text-center fontSize">Tiempo</div>
        </div>
        <div className={classes.desktopItem}>
          <img
            alt="Medellas"
            src={require("assets/img/images/Medallas.webp").default}
            srcSet={medallas}
            className="lg:h-40 md:h-36 sm:h-32 h-28"
          />
          <h2 className={`${classes.font} text-center fontSize`}>
            {userInfo?.data?.aptos != null ? userInfo.data.aptos : 0}
          </h2>
          <div className="text-center fontSize">Aptos</div>
        </div>
        <div className={classes.desktopItem}>
          <img
            style={{ paddingBottom: "5%" }}
            alt="Puntos"
            src={require("assets/img/images/Recurso3Pestaaprueba.webp").default}
            srcSet={puntos}
            className="lg:h-40 md:h-36 sm:h-32 h-28"
          />
          <h2 className={`${classes.font} text-center fontSize`}>
            {userInfo?.data?.points != null ? userInfo.data.points : 0}
          </h2>
          <div className="text-center fontSize">Puntos</div>
        </div>
        <div className={classes.desktopItem}>
          <img
            style={{ paddingBottom: "5%" }}
            alt="Percentil"
            src={require("assets/img/images/Porcentaje2.webp").default}
            srcSet={percentil}
            className="lg:h-36 md:h-32 sm:h-28 h-24"
          />
          <h2 className={`${classes.font} text-center fontSize`}>
            {userInfo?.data?.percentage != null ? userInfo.data.percentage : 0}
          </h2>
          <div className="text-center fontSize">Percentil</div>
        </div>
      </div>

      {logout ? <Navigate to="/" /> : null}

      <MyCalendar />



    </div>
  );
};

export default Homepage;
