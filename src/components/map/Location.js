import React from "react";
import { useTheme } from "@mui/material/styles";
import { MdPlace } from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import useJobSelection from "../../hooks/useJobSelection";

export const PIN_SIZE = 36;

const Location = ({ job, active, selected }) => {
    const theme = useTheme();
    const setHoveredJob = useStoreActions((actions) => actions.setHoveredJob);
    const { selectJob } = useJobSelection();

    return (
        <button
            type="button"
            aria-label={`${job.title} at ${job.company?.display_name}`}
            style={{
                background: "transparent",
                border: 0,
                padding: 0,
                width: PIN_SIZE,
                height: PIN_SIZE,
                cursor: "pointer",
                display: "block",
                transformOrigin: "50% 100%",
                transform: active || selected ? "scale(1.3)" : "scale(1)",
                transition: "transform 150ms ease",
                position: "relative",
                zIndex: active || selected ? 2 : 1,
                filter: "drop-shadow(0 2px 3px rgba(15, 23, 42, 0.3))",
            }}
            onMouseEnter={() => setHoveredJob(job)}
            onMouseLeave={() => setHoveredJob(null)}
            onClick={() => selectJob(job, { recenter: false })}
        >
            <MdPlace
                style={{
                    color: selected ? theme.palette.secondary.main : theme.palette.primary.main,
                    fontSize: PIN_SIZE,
                    display: "block",
                }}
            />
        </button>
    );
};

export default Location;
