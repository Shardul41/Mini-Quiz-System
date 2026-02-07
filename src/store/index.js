// we are importing the function that helps us set up our central data store
import { configureStore } from '@reduxjs/toolkit';
// we are pulling the quiz logic we created in our quizSlice file
import quizReducer from './quizSlice';

// we are creating the main store which acts as the brain for our entire application
export const store = configureStore({
  // we are defining our reducers here so the store knows how to handle quiz data
  reducer: {
    // we are linking the name 'quiz' to our quizReducer to manage the state in one place
    quiz: quizReducer,
  },
});