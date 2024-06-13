import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import LandingPage from 'pages/Landingpage';
import Signin from "pages/Signin";
import Home from "pages/Home";
import Menu from "pages/Menu";
import history from "../history";
import Course from "pages/Course";
import GetMobileNumber from "components/Modals/GetMobileNumber";
import Verification from "pages/verification"

const Directo = React.lazy(() => import("pages/Directo"));

function Root() {
  return (
    <Router history={history}>
      <Routes>
        {/* <Route exact path="/" element={<Signin />} /> */}
        <Route
          exact
          path="/"
          element={
            <IsUserVerified>
              <Home />
            </IsUserVerified>
          }
        />
        <Route
          exact
          path="/menu"
          element={
            <IsUserVerified>
              <Menu />
            </IsUserVerified>
          }
        />
        <Route exact path="/course" element={<Course />} />
        <Route
          exact
          path="/directo"
          element={
            <React.Suspense fallback={<>...</>}>
              <Directo />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/user/verification/:userId"
          element={
            <React.Suspense fallback={<>...</>}>
              <Verification />
            </React.Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

const Overlay = ({ show, children }) => {
  return (
    show && (
      <div className="overlay">
        <div className="popup">{children}</div>
      </div>
    )
  );
};

const IsUserVerified = ({ children }) => {
  const [notVerified, setNotVerified] = useState(true);

  const handleVerification = (isVerified) => {
    setNotVerified(isVerified);
  };

  return (
    <>
      {children}
      <Overlay show={notVerified}>
        <GetMobileNumber onVerify={handleVerification} />
      </Overlay>
    </>
  );
};

export default Root;
