import { action } from "easy-peasy";

const globalState = {
    // state
    jobList: [],
    selectedId: 0,
    selectedJob: null,
    hoveredJob: null,
    center: [34.0522, -118.2437], // default location is Los Angelos, CA. No reason, just a popular city

    // actions
    setJobs: action((state, newList) => {
        state.jobList = newList;
    }),
    setSelectedId: action((state, id) => {
        state.selectedId = id;
    }),
    setSelectedJob: action((state, job) => {
        state.selectedJob = job;
    }),
    setCenter: action((state, latlong) => {
        state.center = latlong;
    }),
    setHoveredJob: action((state, job) => {
        state.hoveredJob = job;
    }),
};

export default globalState;