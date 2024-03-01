import React from "react";
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

    // calculate total pledges
    const totalPledged = project.pledges.reduce((total, pledge) => total + pledge.amount, 0)

    // calculate num pledges made as supporters 
    const totalSupporters = project.pledges.length;

    // calculate num campaign days left
    const currentDate = new Date();
    const endDate = new Date(project.end_date);
    const timeDiff = endDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil.ceil(timeDiff / (1000 * 3600 * 24));

    // calculate percentage of goal raised
    const goalPercentage = Math.min((totalPledged / project.goal) * 100, 100);
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
        // if amount is null or not a number use $0.00 default
        if (amount == null || isNaN(amount)) {
            console.error('Invalid amount', amount);
            return '$0.00'
        }
        // if valid number, return as currency
        return `$${amount.toFixed(2)}`;
    };

    // format date-time stamp
    const formatDateTime = (isoString) => {
        if (!isoString) {
            console.error('Invalid date:', isoString);
            return 'Invalid date';
        }
        const date = new Date(isoString);
        return date.toLocaleString('en-GB', {
            dateStyle: 'short', 
            timeStyle: 'short'
        });
    };

    // sort pledges by most recent
    const sortedPledges = [...project.pledges].sort((a,b) => new Date(b.created) - new Date(a.created));

    return (
    <div>
        <img src={project.image} alt={`${project.title} image`} />
        <h2>{project.title}</h2>
        <h3>Campaign Start Date: {formatDate(project.date_created)}</h3>
        <h3>Status: {getStatusText(project.is_open)}</h3>
        <h3>Description: {project.description}</h3>
        <h3>Goal: {formatCurrency(project.goal)}</h3>
        <h3>Total Pledged: {formatCurrency(totalPledged)}</h3>
        <h3>Days Left: {daysLeft > 0 ? daysLeft: 'Campaign ended.'}</h3>
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${goalPercentage}%`}}></div>
        </div>
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