import { Link } from "react-router-dom";

function ProjectCard(props) {
    const { project } = props;

    return (
        <div>
            <Link to="/project">
                <img scr={project.image} alt={`${project.title}image`}} />
            </Link>
        </div>
    )
}