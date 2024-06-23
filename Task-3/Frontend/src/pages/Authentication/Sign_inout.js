import React, { useState, useContext, useEffect } from 'react';
import * as Components from './Components';
import { AuthContext } from './AuthContext';

function App() {
    const [signIn, toggle] = useState(true);
    const [containerStyle, setContainerStyle] = useState({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
    });
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const resizeHandler = () => {
            setContainerStyle({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: window.innerHeight,
                width: window.innerWidth
            });
        };

        window.addEventListener('resize', resizeHandler);
        
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:8081/insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('User registered successfully');
                setMessageType('success');
                toggle(true);
            } else {
                setMessage(data.message);
                setMessageType('error');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setMessageType('error');
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await fetch('http://localhost:8081/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                login();
                window.location.href = '/';  // Redirect to home page
            } else {
                setMessage(data.message);
                setMessageType('error');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div style={containerStyle}>
            <Components.Container>
                {message && (
                    <div style={{ 
                        color: messageType === 'error' ? 'red' : 'green', 
                        marginBottom: '10px' 
                    }}>
                        {message}
                    </div>
                )}
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input type='text' name='name' placeholder='Name' onChange={handleChange} />
                        <Components.Input type='email' name='email' placeholder='Email' onChange={handleChange} />
                        <Components.Input type='password' name='password' placeholder='Password' onChange={handleChange} />
                        <Components.Button type='button' onClick={handleSignUp}>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input type='email' name='email' placeholder='Email' onChange={handleChange} />
                        <Components.Input type='password' name='password' placeholder='Password' onChange={handleChange} />
                        <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                        <Components.Button type='button' onClick={handleSignIn}>Sign In</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
}

export default App;
