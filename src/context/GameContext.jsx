import { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
    gameState: 'START', // 'START', 'PLAYING', 'RESULT'
    userId: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [], // Record of user answers
    loading: false,
    error: null,
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            return { ...state, userId: action.payload };
        case 'START_GAME':
            return { ...state, loading: true, error: null };
        case 'GAME_LOADED':
            return {
                ...state,
                gameState: 'PLAYING',
                questions: action.payload,
                loading: false,
                currentQuestionIndex: 0,
                score: 0,
                answers: []
            };
        case 'ANSWER_QUESTION':
            // payload: { questionId, isCorrect, selectedOption }
            const newScore = action.payload.isCorrect ? state.score + 1 : state.score;
            return {
                ...state,
                score: newScore,
                answers: [...state.answers, action.payload]
            };
        case 'NEXT_QUESTION':
            return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
        case 'END_GAME':
            return { ...state, gameState: 'RESULT' };
        case 'SET_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'RESET_GAME':
            return { ...initialState, userId: state.userId }; // Keep User ID
        default:
            return state;
    }
};

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
