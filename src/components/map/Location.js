import React from 'react';
import { MdPlace } from "react-icons/md";
import { useStoreActions } from "easy-peasy";

const Location = (props) => {

    const setHoveredJob = useStoreActions(actions => actions.setHoveredJob);
    const setSelectedJob = useStoreActions(actions => actions.setSelectedJob);
    const setSelectedId = useStoreActions(actions => actions.setSelectedId);

    return (
        <button 
            style={{ background: "transparent", border: 0, cursor: "pointer" }}
            onMouseEnter={() => setHoveredJob(props.job)}
            onMouseLeave={() => setHoveredJob(null)}
            onClick={() => {
                setSelectedJob(props.job);
                setSelectedId(props.job.id);
                return;
            }}
        >
            <MdPlace style={{ color: "#ff1744", fontSize: "2.5rem" }}/>
        </button>
    )
}

export default Location
