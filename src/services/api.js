import axios from 'axios';

const API_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;
const QUESTION_COUNT = import.meta.env.VITE_QUESTION_COUNT || 5;

// Mock Data for development or if API_URL is missing
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Which of these is a semantic HTML element?",
    options: ["<div>", "<span>", "<header>", "<b>"],
    answer: "<header>"
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: ["Counter Strike Source", "Cascading Style Sheets", "Creative Style System", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    id: 3,
    question: "In React, what hook is used for side effects?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    answer: "useEffect"
  },
  {
    id: 4,
    question: "What is the complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: "O(log n)"
  },
  {
    id: 5,
    question: "Which HTTP method is idempotent?",
    options: ["POST", "PUT", "PATCH", "CONNECT"],
    answer: "PUT"
  }
];

export const fetchQuestions = async () => {
  if (!API_URL) {
    console.warn("API_URL not set. Using mock data.");
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // Return random subset if needed, but for now return all mock
    return MOCK_QUESTIONS.slice(0, QUESTION_COUNT);
  }

  try {
    const response = await axios.get(`${API_URL}?action=getQuestions&count=${QUESTION_COUNT}`);
    // Assuming API returns { data: [...] } or just [...]
    return response.data.questions || response.data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    // Fallback?
    return MOCK_QUESTIONS.slice(0, QUESTION_COUNT);
  }
};

export const submitResult = async (resultData) => {
  // resultData: { userId, score, passed, attempts, ... }
  if (!API_URL) {
    console.log("Mock Submit:", resultData);
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  }

  try {
    // Using no-cors mode might be needed for GAS plain text, but usually simple POST works if GAS handles logic.
    // Often GAS requires sending as stringified body or x-www-form-urlencoded, or redirect following.
    // We will try standard POST.
    // GAS requires specific handling. Providing a JSON string with text/plain prevents preflight issues and ensures parsing works.
    const response = await axios.post(API_URL, JSON.stringify(resultData), {
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to submit result:", error);
    throw error;
  }
};
