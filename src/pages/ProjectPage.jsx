import React from "react";
import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import ProjectStats from "../components/ProjectStats";
import PledgeList from "../components/PledgeList";
// import "./ProjectPage.css";

function ProjectPage() {
    // use 'useParams' hook that comes in react router to get id from url so it can be passed to useProject hook 
    const { id } = useParams();
    // useProject returns three pieces of info: project, isLoading, error 
    const { project, isLoading, error} = useProject(id);

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;
    if (!project) return <h1>Project not found!</h1>;

    return (
    <div>
        <img src={project.image} alt={`${project.title} image`} />
        <h2>{project.title}</h2>
        <h3>Campaign Start Date: {formatDate(project.date_created)}</h3>
        <h3>Status: {getStatusText(project.is_open)}</h3>
        <h3>Description: {project.description}</h3>
    </div>
    );
}

export default ProjectPage;