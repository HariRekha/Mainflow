import React, { useState, useEffect } from 'react';
import './Calsi.css';

const App = () => {
    const [input, setInput] = useState('');
    const [activeButton, setActiveButton] = useState('');

    const handleButtonClick = (value) => {
        if (value === '=') {
            calculateResult();
        } else if (value === 'C') {
            setInput('');
        } else {
            setInput(input + value);
        }
    };

    const calculateResult = () => {
        try {
            setInput(eval(input).toString());
        } catch (error) {
            setInput('Error');
        }
    };

    const handleKeyPress = (event) => {
        const { key } = event;
        if (/\d/.test(key) || ['+', '-', '*', '/'].includes(key)) {
            setInput(input + key);
            setActiveButton(key);
        } else if (key === 'Enter') {
            calculateResult();
            setActiveButton('=');
        } else if (key === 'Backspace') {
            setInput(input.slice(0, -1));
        } else if (key === 'c' || key === 'C') {
            setInput('');
            setActiveButton('C');
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [input]);

    useEffect(() => {
        if (activeButton) {
            const timer = setTimeout(() => setActiveButton(''), 200);
            return () => clearTimeout(timer);
        }
    }, [activeButton]);

    return (
        <div className="calculator">
            <div className="display">{input}</div>
            <div className="buttons">
                {['7', '8', '9', '/'].map(value => (
                    <button
                        key={value}
                        className={activeButton === value ? 'active' : ''}
                        onClick={() => handleButtonClick(value)}
                    >
                        {value}
                    </button>
                ))}
                {['4', '5', '6', '*'].map(value => (
                    <button
                        key={value}
                        className={activeButton === value ? 'active' : ''}
                        onClick={() => handleButtonClick(value)}
                    >
                        {value}
                    </button>
                ))}
                {['1', '2', '3', '-'].map(value => (
                    <button
                        key={value}
                        className={activeButton === value ? 'active' : ''}
                        onClick={() => handleButtonClick(value)}
                    >
                        {value}
                    </button>
                ))}
                {['0', '.', '=', '+'].map(value => (
                    <button
                        key={value}
                        className={activeButton === value ? 'active' : ''}
                        onClick={() => handleButtonClick(value)}
                    >
                        {value}
                    </button>
                ))}
                <button
                    className={`clear ${activeButton === 'C' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('C')}
                >
                    C
                </button>
            </div>
        </div>
    );
};

export default App;
