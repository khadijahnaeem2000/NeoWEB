import React, {useState} from 'react';
import DownloadFiles from './DownloadFiles/DownloadFiles.js';
import DownloadFolders from './DownloadFolders/DownloadFolders.js';

const DownloadMaterial = () => {
    const [view,setView] = useState('folders');
    const [folderId, setFolderId]= useState(0);
    
    const updateView = (val) => {
        setView(val);
    }

    const updateId = (id) => {
        setFolderId(id);
    }

    return (
        <>
            {view === 'folders' 
                ? <DownloadFolders updateView={updateView} updateId={updateId}/>
                : <DownloadFiles folderId={folderId} updateView={updateView}/> 
            }
        </>
    )
}

export default DownloadMaterial
