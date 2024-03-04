import React from "react";
import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import useAuth from "../hooks/use-auth";
import ProjectStats from "../components/ProjectStats";
import PledgeList from "../components/PledgeList";
import PledgeModal from "../components/PledgeModal";
import { formatDate, getStatusText } from "../ops";

function ProjectPage() {
    // use 'useParams' hook that comes in react router to get id from url so it can be passed to useProject hook 
    const { id } = useParams();
    // useProject returns three pieces of info: project, isLoading, error 
    const { project, isLoading, error, refetchProject} = useProject(id);
    const { auth } = useAuth()

    const handlePledgeSccess = () => {
        refetchProject();
    }

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;
    if (!project) return <h1>Project not found!</h1>;

    return (
    <div>
        <img src={project.image} alt={`${project.title} image`} />
        <h1>{project.title}</h1>
        <ProjectStats project={project} />
        {auth?.user && (
            <PledgeModal projectId={id} onPledgeSuccess={handlePledgeSccess} />
        )}
        <h3>Campaign Start Date: {formatDate(project.date_created)}</h3>
        <h3>Status: {getStatusText(project.is_open)}</h3>
        <h3>Description: {project.description}</h3>
        <PledgeList pledges={project.pledges}/>
    </div>
    );
}

export default ProjectPage;