import { useState, useEffect, useCallback } from "react";
import getProject from "../api/get-project";

export default function useProject(projectId) {
    const [project, setProject] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const fetchProject = useCallback(() => {
        setIsLoading(true);
        getProject(projectId)
        .then((project) => {
            setProject(project);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, [projectId]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    // useEffect(() => {
    //     getProject(projectId)
    //     .then((project) => {
    //     setProject(project);
    //     setIsLoading(false);
    //     })
    //     .catch((error) => {
    //         setError(error);
    //         setIsLoading(false);
    //     });
    // // we pass the projectID to the dependency array so the hook will re-run if the projectID changes
    // }, [projectId]);

    return { project, isLoading, error, refetchProject: fetchProject };
}