import React, { useRef, useState, useEffect } from "react";
import {
  updateLocalStorageTimeStamp,
  getTimeStamp,
} from "../../../services/auth/localStorageData";
import userServices from "services/httpService/userAuth/userServices";
import ReactPlayer from "react-player/lazy";
import "./styles.css";

const AudioPlayer = (props) => {
  console.log("props: ", props);
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const addToSchedule = () => {
    userServices
      .commonPostService("/SendSchedule", {
        studentId: props.userId,
        task: `Audio: ${props.title}`,
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

  const onProgress = () => {
    setDuration(audioRef.current.getCurrentTime());
    updateLocalStorageTimeStamp("openedAudios", props.title, duration);
  };

  return (
    <div className={isMobile ? "" : "audiocontainer"}>
      <div className={isMobile ? "mobileaudio-wrapper" : "mobileaudio-wrapper"}>
        <ReactPlayer
          // style={{
          //   height: isMobile ? "" : "50px",
          //   paddingTop: isMobile ? "" : "54px",
          // }}
          // Disable download button
          config={{
            file: {
              attributes: { controlsList: "nodownload" },
              forceAudio: true,
            },
          }}
          // Disable right click
          onContextMenu={(e) => e.preventDefault()}
          // className={ "mobileaudio-player"}
          width="100%"
          // height={isMobile ? "50px" : null}
          url={props.url}
          controls={true}
          muted={true}
          playing={true}
          ref={audioRef}
          onProgress={onProgress}
          onStart={() => {
            const timeToStart = getTimeStamp("openedAudios", props.title);
            audioRef.current.seekTo(timeToStart, "seconds");
          }}
          onPlay={() => {
            addToSchedule();
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
