import React, {useState} from 'react';
import makePledgeAPIRequest from '../api/post-pledge';

const PledgeForm = ({ projectId, onPledgeSuccess, onClose, token }) => {
    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [error, setError] = useState('');
    const predefinedAmounts = [10, 20, 50, 100];

    const handlePledge  = async (pledgeAmount) => {
        try{
            const response = await makePledgeAPIRequest(projectId, pledgeAmount, token);
            onPledgeSuccess(response);
            onClose();
        } catch (error) {
            setError(error.message || 'An error occured while making the pledge.');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const amount = customAmount || selectedAmount
        if (amount && parseFloat(amount)>1) {
            handlePledge(amount);
        } else {
            setError('Please enter or select an amount greater than $1 to pledge.');
        }
    };

    return (
        <div className="pledge-form-modal">
            <form onSubmit={handleSubmit}>
                <div className="pledge-amounts">
                    {predefinedAmounts.map((amount) => (
                        <label key={amount}>
                            <input
                            type="radio"
                            name="amount"
                            value={amount}
                            checked={selectedAmount === amount.toString()}
                            onChange={() => {
                                setSelectedAmount(amount.toString());
                                setCustomAmount('');
                            }}
                            />
                            ${amount}
                        </label>
                    ))}
                </div>
                <label htmlFor="customAmount">Pledge Amount:</label>
                <input
                id="customAmount"
                type="number"
                value={customAmount}
                onChange={(event) => {
                    setCustomAmount(event.target.value);
                    setSelectedAmount('');
                }}
                placeholder="Enter your amount"
                />
                <button type="submit">Make Pledge</button>
            </form>
            {error && <p className="error">{error}</p>}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default PledgeForm;