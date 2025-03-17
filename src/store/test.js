import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  answerSheet: [],
  question: [
    {
      no: 0,
      subject: "What is 5 + 3?",
      A: "7",
      B: "8",
      C: "9",
      D: "6",
      attempted: false,
      submit: false,
      correctAnswer: "8",
    },
    {
      no: 1,
      subject: "What is 10 - 4?",
      A: "7",
      B: "5",
      C: "6",
      D: "4",
      attempted: false,
      submit: false,
      correctAnswer: "6",
    },
    {
      no: 2,
      subject: "What is 3 × 4?",
      A: "12",
      B: "9",
      C: "8",
      D: "13",
      attempted: false,
      submit: false,
      correctAnswer: "12",
    },
    {
      no: 3,
      subject: "What is 16 ÷ 2?",
      A: "6",
      B: "8",
      C: "10",
      D: "12",
      attempted: false,
      submit: false,
      correctAnswer: "8",
    },
    {
      no: 4,
      subject: "What is the next number in the sequence: 2, 4, 6, ?",
      A: "7",
      B: "8",
      C: "10",
      D: "12",
      attempted: false,
      submit: false,
      correctAnswer: "8",
    },
    {
      no: 5,
      subject: "Which number is the smallest?",
      A: "15",
      B: "12",
      C: "19",
      D: "14",
      attempted: false,
      submit: false,
      correctAnswer: "12",
    },
    {
      no: 6,
      subject: "If a shirt costs ₹200 and you buy 3 shirts, how much do you pay?",
      A: "₹500",
      B: "₹600",
      C: "₹700",
      D: "₹800",
      attempted: false,
      submit: false,
      correctAnswer: "₹600",
    },
    {
      no: 7,
      subject: "What is 9 more than 13?",
      A: "21",
      B: "20",
      C: "22",
      D: "23",
      attempted: false,
      submit: false,
      correctAnswer: "20",
    },
    {
      no: 8,
      subject: "What is half of 50?",
      A: "20",
      B: "30",
      C: "25",
      D: "15",
      attempted: false,
      submit: false,
      correctAnswer: "25",
    },
    {
      no: 9,
      subject: "If you have 4 apples and give away 2, how many do you have left?",
      A: "1",
      B: "2",
      C: "3",
      D: "4",
      attempted: false,
      submit: false,
      correctAnswer: "2",
    },
  ],
  current: [
    {
      no: 0,
      subject: "What is 5 + 3?",
      A: "7",
      B: "8",
      C: "9",
      D: "6",
      attempted: false,
      submit: false,
      correctAnswer: "8",
    },
  ],
};


const questionSlice = createSlice({
  name: "test questions",
  initialState: initialState,
  reducers: {
    questionList() { },
    jumpQuestion(state, action) {
      state.current = [state.question[action.payload]];
      state.question[action.payload].attempted = true;
    },
    submitQuestion(state, action) {
      const question = state.question;
      question[action.payload].attempted = true;
      question[action.payload].submit = true;
      state.question = question;
      if (action.payload === state.question.length - 1) {
        state.current = [state.question[0]];
      } else state.current = [state.question[action.payload + 1]];
    },
    skipQuestion(state, action) {
      const question = state.question;
      state.question = question;
      if (action.payload === state.question.length - 1) {
        question[0].attempted = true;
        state.current = [state.question[0]];
      } else {
        question[action.payload + 1].attempted = true;
        state.current = [state.question[action.payload + 1]];
      }
    },
    submitAnswer(state, action) {
      const exist = state.answerSheet.find(
        (answer) => answer.queno === action.payload.queno
      );
      if (exist) {
        state.answerSheet[action.payload.queno] = action.payload;
      } else {
        state.answerSheet.push(action.payload);
      }
    },
  },
});
export const questionSliceAction = questionSlice.actions;
const questionSlicereducer = questionSlice.reducer;
export default questionSlicereducer;
