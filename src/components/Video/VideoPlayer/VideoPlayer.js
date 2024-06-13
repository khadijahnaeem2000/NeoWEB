import React, { useState, useEffect } from "react";
import {
  updateLocalStorageTimeStamp,
  getTimeStamp,
} from "../../../services/auth/localStorageData";
import Alert from "@mui/material/Alert";
import Vimeo from "@u-wave/react-vimeo";
import Stack from "@mui/material/Stack";
import userServices from "services/httpService/userAuth/userServices";
import "./styles.css";

const VideoPlayer = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const addToSchedule = () => {
    userServices
      .commonPostService("/SendSchedule", {
        studentId: props.userId,
        task: `Video: ${props.title}`,
        type: "video",
        folderId: props.folderId,
        sub_Id: props.subId,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.status === "Successfull") {
            console.log("added to schedule");
          } else {
            console.log("COuldnt add to schedule");
          }
        } else {
          console.log("Could not add to user schedule");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    function checkIsMobile() {
      const ismobile = window.innerWidth < 1000;
      if (ismobile !== isMobile) {
        setIsMobile(ismobile);
      }
    }
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [isMobile]);

  /*useEffect(() => {
    console.log(hlsRef);
    if (Hls.isSupported() && hlsRef) {
      const video = hlsRef;
      console.log(video);
      const hls = new Hls();
      hls.loadSource(
        "https://cdn.bitmovin.com/content/assets/art-of-motion_drm/m3u8s/11331.m3u8"
      );
      hls.attachMedia(video.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.current?.play();
      });
    }
  },[])*/

  const onProgress = (event) => {
    updateLocalStorageTimeStamp("openedVideos", props.title, event.duration);
  };
  
  return (
    <div className={isMobile ? "mobileClassesContainer" : "classescontainer"}>
      <div className={isMobile ? "" : "classesplayer-wrapper"}>
        {!props?.url ? (
          <Stack
            width={500}
            spacing={2}
            style={{ margin: "auto", paddingTop: "2em" }}
          >
            <Alert severity="error">Volver a actividades.</Alert>
          </Stack>
        ) : (
          <Vimeo
            speed={true}
            video={props?.url}
            responsive={true}
            height={500}
            width={750}
            start={getTimeStamp("openedVideos", props.title)}
            onProgress={onProgress}
            onPlay={() => {
              addToSchedule();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
