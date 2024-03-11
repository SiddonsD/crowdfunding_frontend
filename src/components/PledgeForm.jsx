import React, { useEffect, useState } from 'react';
import postPledge from '../api/post-pledge';
import { useAuth } from '../hooks/use-auth';

const PledgeForm = ({ projectId, onPledgeSuccess }) => {
  const { auth, loading } = useAuth();
  const [pledgeData, setPledgeData] = useState({
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
  
  const handleSubmit = async (event) => {
    // prevents form submission while auth data is loading
    if (event) {
      event.preventDefault();
    }

    if (loading){
      return;
    }

    setIsSubmitting(true);

    // const supporter = auth.user_id; // Get the user_id from the auth context
    // const token = auth.token; 

       // gets user id and auth token from local
    const supporter = localStorage.getItem('user_id');
    const token = localStorage.getItem('auth_token');

        // DEBUGGING to be deleted
        console.log('Supporter ID:', supporter);
        console.log('Auth Token:', token);
        console.log('Auth object:', auth);
        console.log('Project', projectId);

    if (!token) {
      console.error('You must be logged in to submit a pledge.')
      window.location.href="/login";
      setIsSubmitting(false);
      return;
    }

    const amount = parseFloat(pledgeData.amount);
    if (isNaN(amount) || amount <= 0) {
        console.error('Invalid amount', pledgeData.amount);
        return;
      }

      try{
        const response = await postPledge({
          ...pledgeData, 
          project: projectId, 
          supporter: supporterId,
        }, token);
        onPledgeSuccess(response);
        setPledgeData({ amount: '', comment: '', anonymous: false });
      
      } catch (error) {
        console.error('Pledge submission failed:', error);
      
      } finally {
        setIsSubmitting(false);
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
        disabled={loading || isSubmitting}
      />
      <input
        type="text"
        name="comment"
        value={pledgeData.comment}
        onChange={handleChange}
        placeholder="Add a comment"
        disabled={loading || isSubmitting}
      />
      <label>
        <input
          type="checkbox"
          name="anonymous"
          checked={pledgeData.anonymous}
          onChange={handleChange}
          disabled={loading || isSubmitting}
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