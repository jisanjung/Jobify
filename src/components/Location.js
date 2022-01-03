import React from 'react';
import { MdPlace } from "react-icons/md";

const Location = () => {
    return (
        <button style={{ background: "transparent", border: 0, cursor: "pointer" }}>
            <MdPlace style={{ color: "#ff1744", fontSize: "2.5rem" }}/>
        </button>
    )
}

export default Location
