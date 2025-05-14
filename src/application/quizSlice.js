import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import mockQuestions from "../mockQuestions.json"

const mockQuestions  = [
    {
      "question": "What is the capital city of France?",
      "options": ["Berlin", "Madrid", "Paris", "Rome"],
      "correct": "Paris"
    },
    {
      "question": "Who painted the Mona Lisa?",
      "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      "correct": "Leonardo da Vinci"
    },
    {
      "question": "What is the largest planet in our solar system?",
      "options": ["Earth", "Jupiter", "Saturn", "Mars"],
      "correct": "Jupiter"
    },
    {
      "question": "Which country is known as the Land of the Rising Sun?",
      "options": ["South Korea", "China", "Japan", "Thailand"],
      "correct": "Japan"
    },
    {
      "question": "How many continents are there on Earth?",
      "options": ["5", "6", "7", "8"],
      "correct": "7"
    }
  ]
const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
      questions: [],
      currentQuestion: 0,
      answers: {},
      status: 'idle',
    },
    reducers: {
      selectAnswer: (state, action) => {
        state.answers[action.payload.index] = action.payload.answer;
      },
      nextQuestion: (state) => {
        if (state.currentQuestion < state.questions.length) {
          state.currentQuestion++;
        }
      },
      resetQuiz: (state) => {
        state.currentQuestion = 0;
        state.answers = {};
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchQuestions.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchQuestions.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.questions = action.payload;
        })
        .addCase(fetchQuestions.rejected, (state) => {
          state.status = 'failed';
        });
    },
  });
  export const fetchQuestions = createAsyncThunk('quiz/fetchQuestions', async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockQuestions), 500));
  });
export const { selectAnswer, nextQuestion, resetQuiz } = quizSlice.actions;
  export default quizSlice.reducer;