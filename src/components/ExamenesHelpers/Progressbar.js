import { height } from "@mui/system";
import React from "react";
import useStyles from "./ProgressStyle";

const Progressbar = (props) => {
  const Style = useStyles();
  const ProgressData = {
    height: `${props.progress}%`,
    backgroundImage: props.bgcolor,
  };

  return (
    <>
      <div className={Style.porgressMainWrapper}>
        <div className={Style.progressWrapper}>
          <div className={Style.progressContent} style={ProgressData}></div>
        </div>
        <div className={Style.progressTextWrapper}>
          <span className={Style.progresstext}>{`${props.progress}%`}</span>
        </div>
      </div>
    </>
  );
};

export default Progressbar;
