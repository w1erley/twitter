import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import './modal.css'; // Ensure this is imported to use the CSS

const ProfileSettingsModal = () => {
    const user = JSON.parse(localStorage.getItem('USER_OBJECT'));

    const navigate = useNavigate();
    const [domReady, setDomReady] = useState(false);

    useEffect(() => {
        setDomReady(true);
    }, []);

    const handleClose = () => {
        navigate(-1); // Navigate back to the previous page
    };

    if (!domReady) return null;

    return ReactDOM.createPortal(
        <div id="profile-settings-modal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Edit Profile</h2>
                <form>
                    <label>
                        Username:
                        <input type="text" defaultValue={user.username} />
                    </label>
                    <label>
                        Bio:
                        <textarea defaultValue={user.bio} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>,
        document.getElementById('modal-root') // Ensure this matches the root element ID
    );
};

export default ProfileSettingsModal;
