import React from "react";
import { formatCurrency, formatDateTime } from "../ops.js";

const PledgeList = ({pledges}) => {
    // sort pledges by most recent
    const sortedPledges = [...pledges].sort((a,b) => new Date(b.created) - new Date(a.created));

    return (
        <>
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
        </>
    );
};

export default PledgeList;