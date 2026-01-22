import { useGame } from '../context/GameContext';
import { submitResult } from '../services/api';
import { useEffect, useState, useRef } from 'react';

const ResultScreen = () => {
    const { state, dispatch } = useGame();
    const { score, questions, userId } = state;
    const total = questions.length;
    // Use env var or default 3
    const PASS_THRESHOLD = Number(import.meta.env.VITE_PASS_THRESHOLD) || 3;

    const isPassed = score >= PASS_THRESHOLD;
    const [submitting, setSubmitting] = useState(false);

    const runOnce = useRef(false);

    useEffect(() => {
        if (runOnce.current) return;
        runOnce.current = true;

        const logResult = async () => {
            setSubmitting(true);
            // Prepare data for GAS
            const resultData = {
                userId: userId,
                score: score,
                total: total,
                passed: isPassed,
                timestamp: new Date().toISOString()
                // GAS might calculate 'attempts' etc if we just send this. 
                // Or we can send 'is_retry' if we tracked it.
                // For now, simple submission.
            };
            try {
                await submitResult(resultData);
            } catch (e) {
                console.error(e);
            } finally {
                setSubmitting(false);
            }
        };
        logResult();
    }, []); // Run once on mount

    const handleRetry = () => {
        dispatch({ type: 'RESET_GAME' });
    };

    return (
        <div className="pixel-card">
            <h2 style={{ color: isPassed ? 'var(--color-success)' : 'var(--color-secondary)' }}>
                {isPassed ? 'MISSION COMPLETE' : 'GAME OVER'}
            </h2>

            <div style={{ margin: '30px 0', fontSize: '1.5rem' }}>
                SCORE: {score} / {total}
            </div>

            <p style={{ marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>
                PASSING SCORE: {PASS_THRESHOLD} / {total}
            </p>

            <p style={{ marginBottom: '20px' }}>
                {isPassed
                    ? "MISSION COMPLETE! (Status Saved)"
                    : "GAME OVER (Try to get higher score!)"}
            </p>

            {/* Debug Info */}
            <div style={{ fontSize: '0.5rem', color: '#555', marginBottom: '10px' }}>
                ID: {userId} | Sent: {isPassed ? "PASS" : "FAIL"}
            </div>

            {submitting && <p style={{ fontSize: '0.6rem', color: '#888' }}>Saving progress...</p>}

            <button onClick={handleRetry}>
                PLAY AGAIN
            </button>
        </div>
    );
};

export default ResultScreen;
