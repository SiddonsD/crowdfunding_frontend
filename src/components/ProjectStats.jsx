import React from "react";
import { formatCurrency } from "../ops.js";
import "./ProjectStats.css";

const ProjectStats = ({ project }) => {
    // calculate total pledges
    const totalPledged = project.pledges.reduce((total, pledge) => total + pledge.amount, 0);
    // calculate num pledges made as supporters 
    const totalSupporters = project.pledges.length;
    
    // calculate num campaign days left
    const currentDate = new Date();
    const endDate = new Date(project.end_date);
    const timeDiff = endDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // calculate percentage of goal raised
    const goalPercentage = Math.min((totalPledged / project.goal) * 100, 100);

    return (
        <>
        <h3>Goal: {formatCurrency(project.goal)}</h3>
        <h3>Total Supporters: {Number(totalSupporters)}</h3>
        <h3>Total Pledged: {formatCurrency(totalPledged)}</h3>
        <h3>Days Left: {daysLeft > 0 ? daysLeft: 'Campaign ended.'}</h3>
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${goalPercentage}%`}}></div>
        </div>
        </>
    );
};

export default ProjectStats;
