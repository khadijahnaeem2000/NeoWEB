import React, {useState} from 'react';
import Folder from './Folder/Folder'
import Files from './Files/Files'

const ClassesFolder = (props) => {
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
            ? <Folder updateView={updateView} updateId={updateId}/> 
            : <Files folderToggle={props.folderToggle} updateView={updateView} updateUrl={props.updateUrl} folderId={folderId}/>
            } 
        </div>
    )
}

export default ClassesFolder
