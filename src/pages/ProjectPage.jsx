import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project"; 

function ProjectPage() {
    // use 'useParams' hook that comes in react router to get id from url so it can be passed to useProject hook 
    const { id } = useParams();
    // useProject returns three pieces of info: project, isLoading, error 
    const { project, isLoading, error} = useProject(id);

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;
    if (!project) return <h1>Project not found!</h1>;

    // convert is_open to active/inactive
    const getStatusText = (is_open) => is_open ? 'Active' : 'Inactive'

    // convert iso date to dd/mm/yyyy
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB', {
            dateStyle: 'short'
        });
    };
    
    // format amount as currency
    const formatCurrency = (amount) => {
        return `$${amount.toFixed(2)}`;
    };

    // format date-time stamp
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-GB', {
            dateStyle: 'short', 
            timeStyle: 'short'
        });
    };

    // sort pledges by most recent
    const sortedPledges = [project.pledges].sort((a,b) => new Date(b.created) - new Date(a.created));
    
    return (
    <div>
        <img src={project.image} alt={`${project.title} image`} />
        <h2>{project.title}</h2>
        <h3>Campaign Start Date: {formatDate(project.date_created)}</h3>
        <h3>Status: {getStatusText(project.is_open)}</h3>
        <h3>Description: {project.description}</h3>
        <h3>Pledges:</h3>
        <ul>
            {sortedPledges.map((pledgeData, key) => {
                const supporterName = pledgeData.anonymous ? 'Anonymous' : pledgeData.supporter_detail?.username;
                return (
                    <li key={key}>
                        {formatCurrency(pledgeData.amount)} from {supporterName}
                        <p>{pledgeData.comment}</p>
                        <p>{formatDateTime(pledgeData.date_created)}</p>
                    </li>
                );
            })}
        </ul>
    </div>
    );
}

export default ProjectPage;