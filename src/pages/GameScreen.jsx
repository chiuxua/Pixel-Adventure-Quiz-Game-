import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

const GameScreen = () => {
    const { state, dispatch } = useGame();
    const { questions, currentQuestionIndex } = state;
    const currentQuestion = questions[currentQuestionIndex];

    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    const handleOptionClick = (option) => {
        if (selectedOption !== null) return; // Prevent double click

        setSelectedOption(option);
        const isCorrect = option === currentQuestion.answer;
        setFeedback(isCorrect ? 'correct' : 'wrong');

        // Delay before next question
        setTimeout(() => {
            dispatch({
                type: 'ANSWER_QUESTION',
                payload: {
                    questionId: currentQuestion.id,
                    isCorrect,
                    selectedOption: option
                }
            });

            if (currentQuestionIndex + 1 < questions.length) {
                dispatch({ type: 'NEXT_QUESTION' });
                // Reset local state
                setSelectedOption(null);
                setFeedback(null);
            } else {
                dispatch({ type: 'END_GAME' });
            }
        }, 1500);
    };

    // DiceBear Avatar Seed
    const avatarSeed = `boss-${currentQuestion.id}-${currentQuestionIndex}`;
    const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${avatarSeed}`;

    return (
        <div className="pixel-card" style={{ width: '100%' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem' }}>
                <span>BOSS {currentQuestionIndex + 1}/{questions.length}</span>
                <span>SCORE: {state.score}</span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                    src={avatarUrl}
                    alt="Pixel Boss"
                    style={{
                        width: '100px',
                        height: '100px',
                        border: '4px solid #fff',
                        backgroundColor: '#000'
                    }}
                />
            </div>

            <h3 style={{ marginBottom: '20px', lineHeight: '1.4' }}>
                {currentQuestion.question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentQuestion.options.map((option, idx) => {
                    let btnStyle = {};
                    if (selectedOption === option) {
                        btnStyle.backgroundColor = feedback === 'correct' ? 'var(--color-success)' : 'var(--color-secondary)';
                        btnStyle.color = '#000';
                        btnStyle.borderColor = '#000';
                    }
                    else if (selectedOption !== null && option === currentQuestion.answer && feedback === 'wrong') {
                        // Show correct answer if wrong selected? Optional.
                        // Let's keep it simple: just show selected feedback.
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleOptionClick(option)}
                            style={btnStyle}
                            disabled={selectedOption !== null}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {feedback && (
                <div style={{ marginTop: '15px', color: feedback === 'correct' ? 'var(--color-success)' : 'var(--color-secondary)' }}>
                    {feedback === 'correct' ? 'CRITICAL HIT!' : 'MISS!'}
                </div>
            )}
        </div>
    );
};

export default GameScreen;
