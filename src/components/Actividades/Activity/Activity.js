import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import {
  getLocalUserdata,
  updatelocalData,
} from "../../../services/auth/localStorageData";
import VideoPlayer from "components/Video/VideoPlayer/VideoPlayer";
import PdfCard from "components/pdfCard/pdfCard";
import Examenes1 from "components/Examenes/index";
import AudioPlayer from "../../AudioLibro/AudioPlayer/AudioPlayer";
import Repaso from "components/Repaso/index";

const Activity = (props) => {
  const data = getLocalUserdata();

  useEffect(() => {
    if (props.item.type === "audio") {
      updatelocalData("openedAudios", {
        title: props.item.activityName,
        timeStamp: 0,
      });
    } else if (props.item.type === "video") {
      updatelocalData("openedVideos", {
        title: props.item.activityName,
        timeStamp: 0,
      });
    } else if (props.item.type === "pdf") {
      updatelocalData("openedPdfs", { title: props.item.activityName });
    }
  }, []);

  const updateView = () => {
    props.updateView("ProgramActivities", props.programId);
  };

  console.log("props A", props);
  return props.item.type === "video" ? (
    <div className="flex flex-col justify-center items-center">
      <IconButton
        style={{ marginTop: "2%" }}
        onClick={() => {
          props.updateView("ProgramActivities", props.programId);
        }}
      >
        <ArrowBackIcon />
        <Typography variant="subtitle2">Volver a actividades</Typography>
      </IconButton>
      <div
        style={{ height: "100vh", width: "100vw" }}
        className={`flex justify-center`}
      >
        <VideoPlayer
          url={props?.item?.vimeolink}
          title={props.item?.activityName}
          userId={data?.id}
          folderId={props?.item?.folderId}
          subId={props?.item?.subId}
          item={props?.item}
        />
      </div>
    </div>
  ) : props.item.type === "pdf" ? (
    <div className="flex flex-col items-center justify-center">
      <IconButton
        style={{ marginTop: "2%" }}
        onClick={() => {
          props.updateView("ProgramActivities", props.programId);
        }}
      >
        <ArrowBackIcon />
        <Typography variant="subtitle2">Volver a actividades</Typography>
      </IconButton>
      <div style={{ height: "100%", width: "100%", marginLeft: "5%" }}>
        <PdfCard fileName={props.item.fileName} load={true} />
      </div>
    </div>
  ) : props.item.type === "repaso" ? (
    <div style={{ marginLeft: "5%" }}>
      <Repaso
        item={props.item}
        showExam="true"
        showScreen="false"
        updateView={updateView}
      />
    </div>
  ) : props.item.type === "english" ||
    props.item.type === "orto" ||
    props.item.type === "psico" ||
    props.item.type === "conocimiento" ||
    props.item.type === "gramatica" ? (
    <>
      <Examenes1
        item={props.item}
        showExam="true"
        showScreen="false"
        updateView={updateView}
      />
    </>
  ) : props.item.type === "audio" ? (
    <div className="flex flex-col justify-center items-center">
      <IconButton
        style={{ marginTop: "1%" }}
        onClick={() => {
          props.updateView("ProgramActivities", props.programId);
        }}
      >
        <ArrowBackIcon />
        <Typography variant="subtitle2">Volver a actividades</Typography>
      </IconButton>
      <div
        style={{ height: "100vh", width: "100vw" }}
        className={`flex justify-center`}
      >
        <VideoPlayer
          url={props.item?.vimeolink}
          title={props.item?.activityName}
          userId={data?.id}
          folderId={props.item?.folderId}
          subId={props.item?.subId}
          item={props.item}
        />
      </div>
    </div>
  ) : (
    <>Nothing to see here!</>
  );
};

export default Activity;
