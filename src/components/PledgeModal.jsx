import React, {useState} from 'react';
import PledgeForm from './PledgeForm';
import useAuth from "../hooks/use-auth.js";
import {makePledgeAPIRequest} from '../api/post-pledge.js'

const PledgeModal = ({ projectId, onPledgeSuccess}) => {
    const [showModal, setShowModal] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const {auth} = useAuth();

    const handleOpenModal = () => {
        if (auth?.token) {
            setShowModal(true);
            setShowThankYou(false);
        } else {
            alert ('You must be logged in to make a pledge.')
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (showThankYou) {
            onPledgeSuccess();
        }
    };

    const handlePledgeSubmit = async (pledgeAmount) => {
        try {
        const url = `${import.meta.env.VITE_API_URL}/pledges`;
        const response = await makePledgeAPIRequest(projectId, pledgeAmount, auth?.token);
        setShowThankYou(true);
        } catch (error) {
            console.error('Pledge submission error:', error);
        }
    };

    return (
        <>
        <button onClick={handleOpenModal}>Make a Pledge</button>
        {showModal && (
            <div className="modal">
                {showThankYou ? (
                    <div className="thank-you-message">
                        <p>Thank you for your support!</p>
                        <button onClick={handleCloseModal}>Close</button>
                        </div>
                ) : (
                <PledgeForm
                projectId={projectId}
                onPledgeSubmit={handlePledgeSubmit}
                onClose={handleCloseModal}
                token={auth?.token}
                />
                )}
            </div>
        )}
        </>
    );
};

export default PledgeModal;