import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { questionState } from '../../utils/type.ts';

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const response = await axios.get('http://localhost:8002/questions');
    return response.data;
  },
);

const initialState: questionState = {
  questions: [],
  currentQuestion: 0,
  totalPoints: 0,
  isAnswered: false,
  status: 'idle',
  error: '',
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    setTotalPoints: (state, action) => {
      state.totalPoints += action.payload;
    },
    setIsAnswered: (state, action) => {
      state.isAnswered = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
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
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export default questionSlice.reducer;
export const { nextQuestion, setTotalPoints, setIsAnswered, setStatus } =
  questionSlice.actions;
