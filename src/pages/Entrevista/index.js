import React from "react";
import LazyLoad from "react-lazyload";
import Entrevista from "../../components/Entrevista/Entrevista";

function ExamenesPage() {
  return (
    <>
      <LazyLoad>
        <Entrevista/>
      </LazyLoad>
    </>
  );
}

export default ExamenesPage;
