import React from "react";
import { formatDateTime } from "../ops.js";

const PledgeList = ({pledges}) => {
    // sort pledges by most recent
    const sortedPledges = [...pledges].sort((a,b) => new Date(b.created) - new Date(a.created));

    return (
        <>
        <h3>Pledges:</h3>
        <ul>
            {sortedPledges.map((pledgeData, index) =>(
                <li key={index}>
                    ${pledgeData.amount} from {pledgeData.anonymous? 'Anonymous' : pledgeData.supporter_detail.username}
                    <p>{pledgeData.comment}</p>
                    <p>{formatDateTime(pledgeData.date_created)}</p>
                </li>
            ))}
            </ul>
        </>
    );
};

export default PledgeList;