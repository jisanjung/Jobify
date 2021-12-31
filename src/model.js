import { action } from "easy-peasy";

export default {
    // state
    jobList: [],
    selectedJob: 0,

    // actions
    setJobs: action((state, newList) => {
        state.jobList = newList;
    })
}