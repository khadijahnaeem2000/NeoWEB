import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  getLocalUserdata,
  updatelocalData,
} from "../../../../services/auth/localStorageData";
import userServices from "services/httpService/userAuth/userServices";
import { toast } from "react-toastify";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import icon from "../../../../assets/img/images/video_icon.webp";
import iosIcon from "../../../../assets/img/images/video_icon.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import useStyles from "../../../MUIScrollbar/MUIScrollbar";
import "../styles.css";

const Files = (props) => {
  const classes = useStyles();
  //const [offset,setOffset]=useState(1);
  //const [call, setCall] = useState(true);
  //const [isEnd, setIsEnd] =useState(false);
  //const [loading,setLoading]=useState(false);
  const [files, setFiles] = useState([]);
  const data = getLocalUserdata();

  //const [isInitialRender, setIsInitialRender] = useState(true);

  /*useLayoutEffect(() => {
    if((!isEnd) && !(document.getElementById('list').scrollHeight > document.getElementById('list').clientHeight) && files.length===15 ){
      if (isInitialRender) {
        setIsInitialRender(false);
        setOffset(offset + 1);
        setLoading(true);
        setCall(false);
      }
    }
  })*/

  useEffect(
    () => {
      //let count=0;
      userServices
        .commonPostService("/getVideoFiles", {
          id: props.folderId,
          studentId: data.id,
          offset: 1,
        })
        .then((response) => {
          if (response.data.status === "Successfull") {
            response.data.data.forEach((item) => {
              
              setFiles((oldArray) => [
                ...oldArray,
                {
                  title: item.title,
                  url: item.vimeolink,
                },
              ]);
              //count++;
            });
            //if(count<15){
            //setIsEnd(true);
            //}
            //setCall(true);
            //setLoading(false);
          } else {
            toast.error("Error fetching files.");
          }
        })
        .catch((error) => {
          toast.error("Error fetching files");
        });
    },
    [
      /*offset*/
    ]
  );

  /*const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 1 ;
    if ((bottom) && (!isEnd) && (call)) { 
          setLoading(true);
          setCall(false)
          setOffset(offset+1)
    }
  }*/

  const searchStorage = (title) => {
    const matchFound = getLocalUserdata()?.openedVideos?.filter((entry) => {
      return entry.title === title;
    });
    if (matchFound.length === 0) {
      return false;
    }
    return true;
  };

  return (
    <>
      <IconButton
        className="backButton"
        style={{ display: props.folderToggle === "0%" ? "none" : "flex" }}
        onClick={() => {
          props.updateView("folders");
        }}
      >
        <ArrowBackIcon />
        <p className="goBackButton">Volver a las carpetas</p>
      </IconButton>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: "78vh",
        }}
        className={`${classes.root} listStyles`}
        id="list"
      >
        {files.length > 0 ? (
          files.map((item) => {
            return (
              <ListItemButton
                className="listItem"
                onClick={() => {
                  props.updateUrl(
                    item?.url,
                    item?.title,
                    data.id,
                    props.folderId,
                    item.id
                  );
                  updatelocalData("openedVideos", {
                    title: item.title,
                    timeStamp: 0,
                  });
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    className="avatarStyles"
                    alt="videofile"
                    src={icon}
                    srcSet={iosIcon}
                    variant="square"
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      className="fileText"
                      variant="text"
                      style={{
                        fontFamily: searchStorage(item.title)
                          ? "ProximaNovaSoft-bold"
                          : "ProximaNovaSoft-regular",
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            );
          })
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <CircularProgress disableShrink />{" "}
          </div>
        )}
      </List>
      {/*!loading ?  null : <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/></div>*/}
    </>
  );
};

export default Files;
