import { action } from "easy-peasy";

export default {
    // state
    jobList: [],

    // actions
    setJobs: action((state, newList) => {
        state.jobList = newList;
    })
}