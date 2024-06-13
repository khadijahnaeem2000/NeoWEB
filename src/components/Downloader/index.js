import React, { useEffect, useState } from "react";
import "./index.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress from '@mui/material/LinearProgress';
import Axios from "axios";
import { getLocalUserdata } from "../../services/auth/localStorageData";
import userServices from 'services/httpService/userAuth/userServices';

const Downloader = ({ files = [], remove }) => {
  const callApi = (file) => {
    const data=getLocalUserdata();
    userServices.commonPostService('/videoDownload',{"studentId":data.id,'videoId':file.id})
    .then(response=>{
      if(response.status===200) {
      }
      else{
        console.log(response);
        console.log("Error increasing download count");
      }
    })
    .catch((error)=> {
      console.log("Error increasing download count");
    });
  }

  return (
    <div style={{background:'white', zIndex:1000}} className="downloader">
      <div className="card">
        <div className="card-header">Descargador</div>
        <ul className="list-group">
          {files.map((file, idx) => (
            <DownloadItem
              key={idx}
              removeFile={() => remove(file.downloadId)}
              callDb={() => callApi(file)}
              {...file}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const DownloadItem = ({ name, file, filename, removeFile, callDb }) => {
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });

  useEffect(() => {
    const options = {
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;

        setDownloadInfo({
          progress: Math.floor((loaded * 100) / total),
          loaded,
          total,
          completed: false,
        });
      },
    };

    Axios.get(file, {
      responseType: "blob",
      ...options,
    }).then(function (response) {
      console.log(response);

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      setDownloadInfo((info) => ({
        ...info,
        completed: true,
      }));

      setTimeout(() => {
        callDb();
        removeFile();
      }, 4000);
    });
  }, []);

  const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <li style={{margin:2}}>
        <div>
          <div>{name}</div>
          <div>
            <small>
              {downloadInfo.loaded > 0 && (
                <>
                  <span>
                    {formatBytes(downloadInfo.loaded)}
                  </span>
                  / {formatBytes(downloadInfo.total)}
                </>
              )}
              {downloadInfo.loaded === 0 && <>Inicializando...</>}
            </small>
          </div>
          <div>
            {downloadInfo.completed && (
              <span>
                Completo <CheckCircleIcon sx={{color:'#003466'}}/>
              </span>
            )}
          </div>
        </div>
        <div>
          {`${downloadInfo.progress}%`}
          <LinearProgress variant="determinate" value={downloadInfo.progress} />
        </div>
    </li>
  );
};

export default Downloader;