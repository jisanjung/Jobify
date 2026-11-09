import { useStoreActions } from "easy-peasy";

// Shared helpers so list items, map pins and the details panel all select jobs the same way.
const useJobSelection = () => {
    const setSelectedId = useStoreActions((actions) => actions.setSelectedId);
    const setSelectedJob = useStoreActions((actions) => actions.setSelectedJob);
    const setCenter = useStoreActions((actions) => actions.setCenter);
    const setHoveredJob = useStoreActions((actions) => actions.setHoveredJob);
    const setDetailsOpen = useStoreActions((actions) => actions.setDetailsOpen);

    const selectJob = (job, { recenter = true } = {}) => {
        // The hovered card unmounts when details open, so its mouseleave never fires
        setHoveredJob(null);
        setSelectedJob(job);
        setSelectedId(job.id);
        setDetailsOpen(true);
        if (recenter && job.latitude && job.longitude) setCenter([job.latitude, job.longitude]);
    };

    // "Back to results": return to the list but keep the job selected
    const closeDetails = () => {
        setHoveredJob(null);
        setDetailsOpen(false);
    };

    const clearSelection = () => {
        setHoveredJob(null);
        setDetailsOpen(false);
        setSelectedJob(null);
        setSelectedId(0);
    };

    return { selectJob, closeDetails, clearSelection };
};

export default useJobSelection;
