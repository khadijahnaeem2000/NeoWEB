import React, {useState} from 'react';
import Folders from './Folders/Folders';
import Files from './Files/Files';

const VideoFolders = (props) => {
    const [view, setView]=useState('folders');
    const [folderId, setFolderId]= useState(0);
    
    const updateView = (val) => {
        setView(val);
    }

    const updateId = (id) => {
        setFolderId(id);
    }

    return (
        <div style={{width:props.folderToggle}} className='folderView'>
            {
                (view==='folders') 
                ? <Folders updateView={updateView} updateId={updateId}/> 
                : <Files folderToggle={props.folderToggle} updateView={updateView} updateUrl={props.updateUrl} folderId={folderId}/>
            }
        </div>
    )
}

export default VideoFolders
