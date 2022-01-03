import { action } from "easy-peasy";

const globalState = {
    // state
    jobList: [],
    selectedId: 0,
    selectedJob: null,
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
};

export default globalState;