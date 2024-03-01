import React, {useState} from 'react';

const PledgeFrom = ({ projectId, onPledgeSuccess, onClose, token }) => {
    const [amount, setAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [error, setError] = useState('');
    const predefinedAmounts = [10, 20, 50, 100];

    const handlePledge  = async (selectedAmount) => {
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
        if (amount) {
            handlePledge(amount);
        } else {
            setError('Please enter or select an amount to pledge.');
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