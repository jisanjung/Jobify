import { action } from "easy-peasy";

const globalState = {
    // state
    jobList: [],
    selectedJob: 0,

    // actions
    setJobs: action((state, newList) => {
        state.jobList = newList;
    }),
    setSelected: action((state, id) => {
        state.selectedJob = id;
    })
};

export default globalState;