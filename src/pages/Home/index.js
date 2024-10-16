import React, { useState, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { compareAsc, add } from "date-fns";

import { getLocalUserdata } from "../../services/auth/localStorageData";
import userServices from "services/httpService/userAuth/userServices";
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import SideMenu from "components/SideMenu/SideMenu.js";
import Homepage from "components/Homepage/Homepage.js";
import Temario from "components/Temario/Temario.js";
import Classes from "components/Classes/Classes.js";
import ExamenesPage from "pages/Examenes/index";
import Entrevista from "pages/Entrevista/index";
import Repaso from "components/Repaso/index.js";
import RankingGlobal from "components/RankingGlobal/RankingGlobal.js";
import { Navigate } from "react-router";
import Descargas from "components/Descargas/Descargas";
import Video from "components/Video/Video";
import AudioLibro from "components/AudioLibro/AudioLibro";
import Actividades from "components/Actividades/Actividades";
import Entrenamiento from "components/Entrenamiento/Entrenamiento";
import ProductosCarrito from "components/Productos";
const Directo = React.lazy(() => import("../../components/Directo/Directo.js"));

function Home() {
  const history = useNavigate();
  const [wid, setWid] = useState("0%");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("Mi escritorio");
  const [folderToggle, setFolderToggle] = useState("0%");
  const [logout, setLogout] = useState(false);
  const data = getLocalUserdata();

  useEffect(() => {
    // let timerInterval = setInterval(() => {
    //   if (data?.type === "Alumno" && data?.expiry_date !== null) {
    //     let { expiry_date } = data;
    //     expiry_date = new Date(expiry_date);
    //     const trial_ended = compareAsc(new Date(), expiry_date);
    //     if (trial_ended === 1) {

    //       setLogout(true);
    //       localStorage.clear();
    //       toast.error(
    //         "Su prueba de un día ha expirado, compre un plan para continuar."
    //       );
    //     }
    //   }
    // }, 1000 * 60);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("beforeunload", handleWindowClose);

    if (data?.IsPaymentComplete === "NO") {
      setCurrentPage("Tienda");
    }
    // Calls onFocus when the window first loads
    onFocus();
    // Specify how to clean up after this effect:
    return () => {
      // clearInterval(timerInterval);
      onBlur();
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  const handleWindowClose = (ev) => {
    onBlur();
  };

  // User has switched back to the tab
  const onFocus = () => {
    userServices
      .commonPostService("/loginTime", { user_id: data?.id })
      .then((response) => {
        if (response.status !== 200) {
          console.log("Cannot log in time");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    // userServices.commonPostService('/logoutTime',{"user_id":data.id})
    // .then((response) =>{
    //   if(response.status!==200) {
    //     console.log("Cannot log out time");
    //   }
    // })
    // .catch((error) =>{
    //   console.log(error);
    // })
  };

  const toggleSideMenu = () => {
    if (toggleMenu === true) {
      setWid("0%");
      setFolderToggle("0%");
      setToggleMenu(false);
    } else if (toggleMenu === false) {
      setWid("20%");
      setFolderToggle("35%");
      setToggleMenu(true);
    }
  };

  const updatePage = (option) => {
    setCurrentPage(option);
  };

  const renderOption = () => {
    if (currentPage === "Mi escritorio") return <Homepage />;
    else if (currentPage === "Temario")
      return <Temario folderToggle={folderToggle} />;
    else if (currentPage === "Entrevista") return <Entrevista />;
    else if (currentPage === "Exámenes") {
      return <ExamenesPage />;
    } else if (currentPage === "Repaso") return <Repaso />;
    else if (currentPage === "Salir") {
      localStorage.clear();
      window.location.replace("https://neoestudio.net/aula_virtual");
      return;
    } else if (currentPage === "Videos")
      return <Video folderToggle={folderToggle} />;
    else if (currentPage === "Clases")
      return <Classes folderToggle={folderToggle} />;
    else if (currentPage === "Ranking global") return <RankingGlobal />;
    else if (currentPage === "Descargas") return <Descargas />;
    else if (currentPage === "Audiolibro") return <AudioLibro />;
    else if (currentPage === "Actividades") return <Actividades />;
    else if (currentPage === "Tienda") return <ProductosCarrito />;
    else if (currentPage === "Entrenamiento") {
      return <Entrenamiento />;
    } else if (currentPage === "En Directo") {
      if (data.type === "Alumno" || data.type === "Alumno-Free Trial") {
        var stylesheet = document.styleSheets[0];
        stylesheet.disabled = false;
        stylesheet = document.styleSheets[1];
        stylesheet.disabled = false;
        return (
          <Suspense fallback={<div></div>}>
            <Directo />
          </Suspense>
        );
      } else {
        return (
          <div className="flex justify-center">
            Compre el plan para acceder a este módulo.
          </div>
        );
      }
    }
  };

  return (
    <>
      <HomeNavbar toggleSideMenu={toggleSideMenu} />
      <div>
        <SideMenu width={wid} updatePage={updatePage} />
        {renderOption()}
      </div>
      {logout ? <Navigate to="/" /> : null}
    </>
  );
}
export default Home;
