import React from "react";
import LazyLoad from "react-lazyload";
import Examenes from "../../components/Examenes/index";

function ExamenesPage() {
  return (
    <>
      <LazyLoad>
        <Examenes showExam='false' showScreen='true'/>
      </LazyLoad>
    </>
  );
}

export default ExamenesPage;
