import React, { useState } from "react";
import VideoFolders from "./VideoFolders/VideoFolders";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import "./styles.css";

const Video = (props) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [folderId, setFolderId] = useState("");
  const [subId, setSubId] = useState("");

  const updateUrl = (val, title, id) => {
    setUrl(val);
    setTitle(title);
    setUserId(id);
    setFolderId(folderId);
    setSubId(subId);
  };

  return (
    <div className="stackStyle">
      <VideoFolders folderToggle={props.folderToggle} updateUrl={updateUrl} />
      <hr />
      {url && (
        <VideoPlayer
          url={url}
          title={title}
          userId={userId}
          folderId={folderId}
          subId={subId}
        />
      )}
    </div>
  );
};

export default Video;
