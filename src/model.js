import { action } from "easy-peasy";

const globalState = {
    // state
    jobList: [],
    selectedJob: 0,
    center: [40.241562, -75.283737],

    // actions
    setJobs: action((state, newList) => {
        state.jobList = newList;
    }),
    setSelected: action((state, id) => {
        state.selectedJob = id;
    }),
    setCenter: action((state, latlong) => {
        state.center = latlong;
    }),
};

export default globalState;