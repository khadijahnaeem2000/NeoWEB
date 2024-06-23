import React, { useRef, useState, useEffect } from "react";
import {
  updateLocalStorageTimeStamp,
  getTimeStamp,
} from "../../../services/auth/localStorageData";
import userServices from "services/httpService/userAuth/userServices";
import Alert from "@mui/material/Alert";
import Vimeo from "@u-wave/react-vimeo";
import Stack from "@mui/material/Stack";
import "./styles.css";

const AudioPlayer = (props) => {
  console.log('props: ', props);
  

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const addToSchedule = () => {
    userServices
      .commonPostService("/SendSchedule", {
        studentId: props.userId,
        task: `Audio: ${props.activityName}`,
        type: "audio",
        folderId: props.folderId,
        sub_Id: props.subId,
      })
      .then((response) => {
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
        console.log("it is a mobile");
      }
    }
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [isMobile]);

  const onProgress = (event) => {
    updateLocalStorageTimeStamp("openedAudios", props.activityName, event.duration);
  };

  return (
    <div className={isMobile ? "" : "audiocontainer"}>
      <div className={isMobile ? "mobileaudio-wrapper" : "audioplayer-wrapper"}>
        {!props?.item?.vimeolink ? (
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
            video={props?.item?.vimeolink}
            responsive={true}
            height={500}
            width={750}
            start={getTimeStamp("openedAudios", props.item.activityName)}
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

export default AudioPlayer;
