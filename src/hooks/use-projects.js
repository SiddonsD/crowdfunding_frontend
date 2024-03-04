import { useState, useEffect } from "react";
import getProjects from "../api/get-projects";

export default function useProjects() {
    // using useState hook to create a state variable called projects and a fuction to update it called setProjects, initialising the state variable with an empty array.
    const [projects, setProjects] = useState([]);
    // create a state variable called isLoading and error to keep track of loading state and any errors
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    // use useEffect hook to fetch projects from API and update the state variables. This will only be run once, when component this hook is used in is mounted.
    useEffect(() => {
        getProjects()
        .then((projects) => {
            setProjects(projects);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    // return state variables and error. As state in hook changes it will update values and component using this hook will re-render.
    return {projects, isLoading, error};
}

// export default getProjects;
