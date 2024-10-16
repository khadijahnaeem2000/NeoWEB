import React, { useEffect, useState } from "react";
import useStyles from "./styles.js";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userServices from "services/httpService/userAuth/userServices";
import {
  getLocalUserdata,
  updateLocalUserdata, // Assuming you have a function to update local storage
} from "../../services/auth/localStorageData";

const SideMenu = (props) => {
  const history = useNavigate();
  const [active, setActive] = useState("Mi escritorio");
  const [isBlocked, setIsBlocked] = useState(false); // Use state for isBlocked
  const data = getLocalUserdata() || {}; // Default to an empty object if data is null

  const [menu] = useState([
    "Mi escritorio",
    "Actividades",
    "Entrenamiento",
    "En Directo",
    "Clases",
    "Exámenes",
    "Temario",
    "Videos",
    "Ranking global",
    "Audiolibro",
    "Repaso",
    "Entrevista",
    "Descargas",
    "Tienda",
    "Salir",
  ]);

  const [fileNames] = useState([
    "Calendario",
    "Actividades",
    "Entrenamiento",
    "Directo",
    "clases",
    "examen",
    "Temario",
    "Video",
    "ranking",
    "audiolibro",
    "repaso",
    "entrevista_personal",
    "descargas",
    "shopping",
    "salir",
  ]);

  const classes = useStyles();

  useEffect(() => {
    // Fetch user status and update isBlocked
    const fetchUserStatus = async () => {
      try {
        const response = await userServices.commonPostService("/user", {
          id: data?.id,
        });
        if (response.status === 200) {
          if (response.data.is_block === true) {
            setIsBlocked(true);
          } else if (response.data.field1x === "Bloquear") {
            setIsBlocked(true); // Update state to block the user
            //updateLocalUserdata(userData); // Update local storage with the user data
            // Optionally, show an error message
            toast.error(
              "¡Estás bloqueado, por favor contacta al administrador!"
            );
          } else {
            setIsBlocked(false); // Unblock if the user is not blocked
          }
        } else {
          console.log("Cannot get updated info");
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();
  }, [data?.id]); // Trigger useEffect when data.id changes

  return (
    <>
      <div
        style={{ width: props.width, height: "96vh", overflow: "auto" }}
        className={`shadow-5 ${classes.container} ${classes.root}`}
      >
        {menu.map((x, i) => (
          <div
            key={i}
            onClick={() => {
              if (
                !isBlocked ||
                x === "Salir" ||
                x === "Tienda" ||
                x === "Mi escritorio"
              ) {
                // Disable click except for "Salir"
                setActive(x);
                props.updatePage(x);
              }
            }}
            component={Link}
            to={`/${x}`}
            className={`${
              classes.sidebaritems
            } sidebaritems items-center cursor-pointer transition-opacity duration-100 ease-out 
              ${
                isBlocked &&
                x !== "Salir" &&
                x !== "Tienda" &&
                x !== "Mi escritorio"
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100 hover:opacity-50"
              }`} // Apply styles for disabled items
          >
            <img
              alt="..."
              className="w-1/5 menuItem"
              src={require(`assets/img/images/${fileNames[i]}.webp`).default}
              srcSet={`${
                require(`assets/img/images/${fileNames[i]}.png`).default
              }`}
            />
            <div
              className="fSize"
              style={{
                fontFamily:
                  active === x ? "Montserrat-bold" : "Montserrat-regular",
              }}
            >
              {x}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SideMenu;
