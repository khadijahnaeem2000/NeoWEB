import React, {useState} from 'react';
import Programs from './Programs/Programs.js';
import Activity from './Activity/Activity.js';
import ProgramActivities from './ProgramActivities/ProgramActivities.js';

const Actividades = () => {
    const [view, setView] = useState('Programs');
    const [programId, setProgramId] = useState(0);
    const [item, setItem] = useState([]);

    const updateView = (val, programID=0) => {
        setView(val);
        if(programID!==0) {
            setProgramId(programID);
        }
    }

    const updateId = (id) => {
        setProgramId(id);
    }

    const updateActivity = (item) => {
        setItem(item);
    }

    return (
        <>
        {
            (view==='Programs') ? 
            <Programs updateView={updateView} updateId={updateId}/> : 
                (view==='ProgramActivities') ? 
                <ProgramActivities updateActivity={updateActivity} updateView={updateView} programId={programId}/> :
                <Activity programId={programId} updateView={updateView} item={item}/>
        }
        </>
    )
}
export default Actividades
