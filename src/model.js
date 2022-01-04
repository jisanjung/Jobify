import { action } from "easy-peasy";

const globalState = {
    // state
    jobList: [],
    selectedId: 0,
    selectedJob: null,
    hoveredJob: null,
    center: [40.241562, -75.283737],

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