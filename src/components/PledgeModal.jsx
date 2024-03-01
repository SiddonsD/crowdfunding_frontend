import React, {useState} from 'react';
import PledgeForm from './PledgeForm';
import useAuth from "../hooks/use-auth.js";

const PledgeModal = ({ projectId, onPledgeSuccess}) => {
    const [showModal, setShowModal] = useState(false);
    const {auth} = useAuth();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
        <button onClick={handleOpenModal}>Make a Pledge</button>
        {showModal && (
            <div className="modal">
                <PledgeForm
                projectId={projectId}
                onPledgeSuccess={onPledgeSuccess}
                onClose={handleCloseModal}
                token={auth.token}
                />
            </div>
        )}
        </>
    );
};

export default PledgeModal