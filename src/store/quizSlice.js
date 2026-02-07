// we are importing the tool to create a slice of our global state
import { createSlice } from '@reduxjs/toolkit';
// we are pulling the quiz questions from our local json file
import questionsData from '../data/questions.json';

// we are creating the slice that will manage all our quiz logic and data
const quizSlice = createSlice({
  // the name of this slice used for identification
  name: 'quiz',
  // this is the starting data of our quiz before any user interaction occurs
  initialState: {
    // we are loading the static questions from our json file
    questions: questionsData, 
    // we are creating an empty object to store the user's selected answers
    answers: {}, 
    // it tracks if the quiz is finished or still active
    isFinished: false,
    // we are initializing the score at zero
    score: 0,
  },
  // these are the functions that will update our quiz state
  reducers: {
    // this handles what happens when a user clicks on an option
    setAnswer: (state, action) => {
      // we are getting the question id and the value selected by the user
      const { qId, selectedValue } = action.payload;

      // if the user clicks the same option twice, then it will delete the answer to unselect it
      if (state.answers[qId] === selectedValue) {
        // it removes the answer from the object if clicked again
        delete state.answers[qId];
      } else {
        // it saves the user's selection into our answers object
        state.answers[qId] = selectedValue;
      }
    },

    // this is the logic that runs when the quiz is submitted or the timer runs out
    finishQuiz: (state) => {
      // we are preventing the code from running again if the quiz is already done
      if (state.isFinished) return;
      
      // we are creating a temporary counter for the correct answers
      let correctCount = 0;
      // we are looping through each question to check the user's answer
      state.questions.forEach((q) => {
        // it compares the user's choice with the correct key provided in our json
        if (state.answers[q.id] === q.correct) {
          // it increases the counter if the answer is correct
          correctCount++;
        }
      });
      
      // we are updating the final score with our calculated total
      state.score = correctCount;
      // we are setting isFinished to true to display the result screen
      state.isFinished = true;
    },

    // this function clears everything so the user can take the quiz again
    resetQuiz: (state) => {
      // it empties the answers object
      state.answers = {};
      // it sets the finish status back to false for a fresh start
      state.isFinished = false;
      // it resets the score back to zero
      state.score = 0;
    }
  },
});

// we are exporting our actions so we can use them in our components with dispatch
export const { setAnswer, finishQuiz, resetQuiz } = quizSlice.actions;
// we are exporting the reducer to be added to our store
export default quizSlice.reducer;