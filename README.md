Mini Quiz System
This is a simple Quiz application built with React, tailwind and Redux. It allows users to take a timed quiz, tracks their answers, and shows a final score.

How it Works (The Logic)
The State (Redux): I used Redux to keep track of everything in one place. 

It stores:
  1.  Which question you are currently on.
  2.  The answers you have selected.
  3.  Whether the quiz is still running or finished.

The Timer: There is a countdown timer on the screen. The most important part is the Auto-Submit feature: if the timer hits zero, it automatically stops the quiz and jumps to the results page so the user can't answer anymore.

The Scoring: Once you finish (either by clicking "Submit" or running out of time), the app compares your answers to the correct ones and calculates your total score instantly.

Main Features
  1.  One-by-One Questions: Easy to focus on one question at a time.
  2.  Timer: A clear countdown so you know how much time is left.
  3.  Automatic Submission: No need to worry if time runs out; your score is saved automatically.

Results Page: Shows exactly how you performed at the end.

How to Run the Project
Install: Run npm install in your terminal.
Start: Run npm run dev to open the app in your browser.

This is our main page where we start the quiz 
<img width="1843" height="918" alt="image" src="https://github.com/user-attachments/assets/e1f96310-90f9-4aba-b6db-7f28e64cec66" />

This is our result page where we get to see the actual result or score after submitting the quiz
<img width="1808" height="888" alt="image" src="https://github.com/user-attachments/assets/3471bdd0-8572-426f-8d74-62ffeac9cdde" />



