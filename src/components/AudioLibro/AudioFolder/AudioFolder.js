import React, {useState} from 'react';
import Folders from './Folders/Folders'
import Files from './Files/Files'

const AudioFolder = (props) => {
    const [view, setView]=useState('folders');
    const [folderId, setFolderId]= useState(0);
    
    const updateView = (val) => {
        setView(val);
    }

    const updateId = (id) => {
        setFolderId(id);
    }

    return (
        <div className='folderView' style={{marginTop:'2%', marginLeft:'2%', marginBottom:'2%', width:"35%"}}>
            {                
            (view==='folders') 
            ? <Folders updateView={updateView} updateId={updateId} folders={props.folders} loading={props.loading}/> 
            : <Files updateView={updateView} updateUrl={props.updateUrl} folderId={folderId}/>
            } 
        </div>
    )
}

export default AudioFolder
