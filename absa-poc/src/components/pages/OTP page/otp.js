// src/OtpVerification.js
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './OtpVerification.css'; // For styling
import Navbar from '../../navbar/navbar';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Replace this URL with your actual API endpoint
            const response = await fetch('/api/verify_otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp }),
            });

            if (!response.ok) {
                throw new Error('OTP verification failed');
            }

            // Handle successful OTP verification with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'OTP verified successfully!',
                confirmButtonText: 'OK'
            });

        } catch (err) {
            // Handle error with SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
                confirmButtonText: 'Try Again'
            });
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <Navbar/>  
        <div className="containe">
            <form className="otp-form" onSubmit={handleSubmit}>
                <h2>Enter OTP</h2>
                <label htmlFor="otp">One-Time Password</label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength="6"
                    required
                /><br></br>
                <button type="submit" className="button" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
                {error && <p className="error">{error}</p>}
                <div className="resend">
                    <p>Didn't receive the OTP? <a href="/resend_otp">Resend OTP</a></p>
                </div>
            </form>
        </div>
        </>
    );
};

export default OtpVerification;
