import React, { useState } from "react";
import ClassesPlayer from "./ClassesPlayer/ClassesPlayer.js";
import ClassesFolder from "./ClassesFolder/ClassesFolder.js";
import "./styles.css";

const Classes = (props) => {
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
      <ClassesFolder folderToggle={props.folderToggle} updateUrl={updateUrl} />
      <hr />
      {url && (
        <ClassesPlayer
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

export default Classes;
