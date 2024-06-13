import React, {useState} from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import useFileDownloader from "hooks/useFileDownloader";

const DownloadButton = (props) => {
  const [file,setFile] = useState({'id':props.item.id,'name':props.item.title,
                                    'thumb':"",
                                    'file':`https://neoestudio.net/${props.item.file}`,
                                    'filename':props.item.title})
  const [downloadFile, downloaderComponentUI] = useFileDownloader();
  const [downloadCount, setDownloadCount] = useState(props.downloadCount);

  const download = (file) => {
    downloadFile(file);
    setDownloadCount((shareCount) => Number(shareCount) + 1); 
  }
  
  return (
    <>
    <IconButton onClick={() => {download(file)}} className='flex flex-col' aria-label="Descargar">
        <DownloadIcon fontSize="medium"/>
        <span style={{fontSize:'70%'}}>{downloadCount}</span>
    </IconButton>
    {downloaderComponentUI}
    </>
  )
}

export default DownloadButton
