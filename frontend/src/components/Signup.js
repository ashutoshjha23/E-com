
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        if (response.ok) {
            alert('Signup successful!');
            navigate('/login');
        } else {
            alert('Signup failed!');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Signup</h2>
            <form onSubmit={handleSignup} style={styles.form}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    style={styles.input}
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Signup</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Signup;
