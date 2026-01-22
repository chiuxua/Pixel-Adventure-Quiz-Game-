import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { fetchQuestions } from '../services/api';

const StartScreen = () => {
    const { dispatch } = useGame();
    const [inputVal, setInputVal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStart = async () => {
        if (!inputVal.trim()) return;

        setIsLoading(true);
        setError(null);
        dispatch({ type: 'SET_USER_ID', payload: inputVal });
        dispatch({ type: 'START_GAME' });

        try {
            const questions = await fetchQuestions();
            dispatch({ type: 'GAME_LOADED', payload: questions });
        } catch (err) {
            console.error(err);
            setError("Failed to load questions. Please check connection.");
            dispatch({ type: 'SET_ERROR', payload: err.message });
            setIsLoading(false);
        }
    };

    return (
        <div className="pixel-card">
            <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '30px' }}>
                PIXEL<br />ADVENTURE
            </h1>
            <p style={{ marginBottom: '20px' }}>Enter your ID to begin:</p>

            <input
                type="text"
                placeholder="PLAYER ID"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                autoFocus
            />

            {error && <p style={{ color: 'var(--color-secondary)', fontSize: '0.8rem' }}>{error}</p>}

            <button onClick={handleStart} disabled={isLoading || !inputVal.trim()}>
                {isLoading ? 'LOADING...' : 'START GAME'}
            </button>
        </div>
    );
};

export default StartScreen;
