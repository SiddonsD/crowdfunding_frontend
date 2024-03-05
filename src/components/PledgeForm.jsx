import React, { useState } from 'react';
import postPledge from '../api/post-pledge';
import { useAuth } from '../hooks/use-auth';

const PledgeForm = ({ projectId, onPledgeSuccess }) => {
  const { auth } = useAuth();
  const [pledgeData, setPledgeData] = useState({
    amount: '',
    comment: '',
    anonymous: false,
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setPledgeData({
      ...pledgeData,
      [name]: name === 'anonymous' ? checked : value,
    });
  };

  console.log(auth)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const amount = parseFloat(pledgeData.amount);
    if (auth.token && !isNaN(amount) && amount > 1) {
      try {
        const supporterId = auth.user.username
        const response = await postPledge({...pledgeData, supporter: supporterId}, projectId, auth.token );
        onPledgeSuccess(response);
        setPledgeData({ amount: '', comment: '', anonymous: false, supporter: supporterId });
      } catch (error) {
        console.error('Pledge submission failed:', error);
      }
    } else {
      console.error('Invalid amount', pledgeData.amount);
    }
  };

  // if (!auth.token) {
  //   return null;
  // }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        value={pledgeData.amount}
        onChange={handleChange}
        placeholder="Pledge amount"
        min="1"
        required
      />
      <input
        type="text"
        name="comment"
        value={pledgeData.comment}
        onChange={handleChange}
        placeholder="Add a comment"
      />
      <label>
        <input
          type="checkbox"
          name="anonymous"
          checked={pledgeData.anonymous}
          onChange={handleChange}
        />
        Pledge anonymously
      </label>
      <button type="submit">Pledge</button>
    </form>
  );
};

export default PledgeForm;