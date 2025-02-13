import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { requestPasswordReset, messageClear } from "../store/reducers/authReducer";

import toast from 'react-hot-toast';
const ForgotPassword = () => {
    const { successMessage, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dispatching requestPasswordReset with email:', email);
        dispatch(requestPasswordReset({ email }));
    };

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage); 
            dispatch(messageClear());
        }
        if (successMessage) {
            toast.success(successMessage); 
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage]);

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};
export default ForgotPassword