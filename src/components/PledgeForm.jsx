import React, { useEffect, useState } from 'react';
import postPledge from '../api/post-pledge';
import { useAuth } from '../hooks/use-auth';

const PledgeForm = ({ projectId, onPledgeSuccess }) => {
  const { auth, loading } = useAuth();
  const [pledgeData, setPledgeData,] = useState({
    amount: '',
    comment: '',
    anonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // if user is auth and submission interupted, try submitting pledge again
  useEffect(() => {
    if (!loading && isSubmitting) {
      handleSubmit();
    }
  }, [loading, isSubmitting]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setPledgeData({
      ...pledgeData,
      [name]: name === 'anonymous' ? checked : value,
    });
  };

  // DEBUGGING to be deleted
  console.log(auth)
  
  const handleSubmit = async (event) => {
    // prevents form submission of auth data is loading
    if (loading){
      setIsSubmitting(true);
      return;
    }

    if (event) {
      event.preventDefault();
    }
    
    const amount = parseFloat(pledgeData.amount);
  
    // DEBUGGING to be deleted
    console.log('Auth token:', auth.token);
    console.log('Auth user:', auth.id);  

    if (!auth.token ) {
      console.error('You must be logged in to submit a pledge.')
      window.location.href="/login";
      return;
    }

    const supporterId = auth.id;

    if (!isNaN(amount) && amount > 0) {
      try {
        const response = await postPledge(pledgeData, auth.id, projectId, auth.token );
        onPledgeSuccess(response);
        setPledgeData({ amount: '', comment: '', anonymous: false });
        setIsSubmitting(false)
      } catch (error) {
        console.error('Pledge submission failed:', error);
      }
    } else {
      console.error('Invalid amount', pledgeData.amount);
    }
  };

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
        disabled={loading}
      />
      <input
        type="text"
        name="comment"
        value={pledgeData.comment}
        onChange={handleChange}
        placeholder="Add a comment"
        disabled={loading}
      />
      <label>
        <input
          type="checkbox"
          name="anonymous"
          checked={pledgeData.anonymous}
          onChange={handleChange}
          disabled={loading}
        />
        Pledge anonymously
      </label>
      <button type="submit" disabled={loading || isSubmitting}>
        {loading || isSubmitting? 'Submitting...' : 'Pledge'}
        </button>
    </form>
  );
};

export default PledgeForm;