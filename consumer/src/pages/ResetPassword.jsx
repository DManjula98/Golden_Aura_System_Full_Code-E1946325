import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword,  messageClear } from "../store/reducers/authReducer";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const ResetPassword = ({ onSubmit }) => {
    const { token } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { successMessage, errorMessage } = useSelector((state) => state.auth);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!token || !newPassword) {
            toast.error("Token and new password are required");
            return;
        }

        dispatch(resetPassword({ token, new_password: newPassword }));
    };

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setTimeout(() => {
                navigate("/login");
            }, 2000); 
        }
    }, [successMessage, errorMessage, dispatch, navigate]);

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};
export default ResetPassword