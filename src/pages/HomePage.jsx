import { allProjects } from "../data";
import ProjectCard from "../components/ProjectCard";

function HomePage () {
    return (
    <div>
        {allProjects.map((projectData, key) => {
            return <div key={key}>{projectData.title}</div>;
        })}
        </div>

export default HomePage;