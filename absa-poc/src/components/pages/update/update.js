import React, { useState } from 'react';
import absa1 from './absa.png'; // Import ABSA logo
import profileIcon from './profile-icon.jpg'; // Import profile icon
import signOutIcon from './sign-out.jpg'; // Import sign-out icon

const Update = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ firstName, lastName, email, phone });
    };

    return (
        <div style={{ backgroundColor: '#fff', textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ backgroundColor: '#DC0032', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={absa1} alt="ABSA Logo" style={{ width: '50px', height: 'auto' }} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={profileIcon} alt="Profile Icon" style={{ width: '40px', height: 'auto', marginRight: '10px' }} />
                    <img src={signOutIcon} alt="Sign Out Icon" style={{ width: '40px', height: 'auto' }} />
                </div>
            </div>
            <h2 style={{ color: '#d32f2f' }}>Contact Info</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ margin: '10px 0' }}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #d32f2f',
                            marginBottom: '10px'
                        }}
                    />
                </div>
                <div style={{ margin: '10px 0' }}>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #d32f2f',
                            marginBottom: '10px'
                        }}
                    />
                </div>
                <div style={{ margin: '10px 0' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #d32f2f',
                            marginBottom: '10px'
                        }}
                    />
                </div>
                <div style={{ margin: '10px 0' }}>
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #d32f2f',
                            marginBottom: '10px'
                        }}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#4caf50',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        CONFIRM
                    </button>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <button
                        type="button"
                        style={{
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => console.log('Back Home')}
                    >
                        BACK HOME
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;
