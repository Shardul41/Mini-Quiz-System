import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer, finishQuiz, resetQuiz } from "../store/quizSlice";
import Timer from "./Timer";

function QuizModule() {
  // we are initializing the dispatch function to send actions to redux
  const dispatch = useDispatch();
  // we are extracting the quiz state from the redux store
  const { questions, answers, isFinished, score } = useSelector(
    (state) => state.quiz,
  );

  // we are calculating how many questions have been answered by counting the keys in the answers object
  const attemptedCount = Object.keys(answers).length;

  // this is the result screen that occurs after submitting the quiz
  if (isFinished) {
    // we are defining a function to provide different feedback messages based on the final score
    const getFeedback = () => {
      if (score === questions.length) return "Absolute Perfection! 🏆";
      if (score > 7) return "Impressive Work! 🌟";
      if (score > 4) return "Good Effort! Keep practicing. 👍";
      return "Don't give up! Try again. 💪";
    };

    return (
      // the main container for the result screen with a dark theme and centered content
      <div className="h-dvh bg-slate-900 flex items-center justify-center p-6 font-sans">
        {/* the card made for the result which contains the score and feedback details */}
        <div className="max-w-md w-full bg-slate-800 shadow-2xl p-12 text-center border border-slate-700 relative overflow-hidden">
          {/* it displays the main heading for the results */}
          <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
            Quiz Results
          </h1>

          <div className="relative inline-block mb-8">
            {/* we have created a circular result display for the total score to make it look professional */}
            <div className="w-44 h-44 rounded-full bg-emerald-600 flex flex-col items-center justify-center text-white shadow-lg shadow-emerald-900/50 ">
              {/* The Score in the center displaying the points earned */}
              <span className="text-6xl font-black">{score}</span>
              {/* The separator line between the score and total number of questions */}
              <div className="h-px w-12 bg-white/50 my-2"></div>
              {/* It displays the total number of questions in the quiz */}
              <span className="text-emerald-100 font-bold text-lg uppercase tracking-widest">
                {questions.length}
              </span>
            </div>
          </div>

          <div className="mb-10">
            {/* Feedback message based on the score logic defined in getFeedback */}
            <h2 className="text-2xl font-bold text-white mb-2">
              {getFeedback()}
            </h2>
            {/* Performance percentage display that calculates the score into a percentage value */}
            <p className="text-slate-400 font-medium">
              {"Performance: " +
                Math.round((score / questions.length) * 100) +
                "% Correct"}
            </p>
          </div>

          {/* Restart Button that clears the state and returns the user to the starting quiz screen */}
          <button
            onClick={() => dispatch(resetQuiz())}
            className="group w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-600 border border-slate-700 hover:border-emerald-500 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Restart Challenge</span>
            {/* Animated SVG icon that rotates when the user hovers over the button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  {
    /* the main display for the starting page of the screen where questions are listed */
  }
  return (
    // the layout wrapper for the active quiz interface
    <div className="min-h-dvh bg-slate-900 pb-12 font-sans">
      {/* the sticky header that stays at the top while scrolling */}
      <header className="bg-slate-800 shadow-md sticky top-0 z-50 p-4 border-b border-slate-700">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          {/* the title of the application displayed in the navbar */}
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Mini Quiz
          </h1>

          {/* these are the indicators for the attempted questions and the countdown timer on the navbar */}
          <div className="flex items-center gap-8">
            {/* it shows how many questions the user has answered so far out of the total count */}
            <div className="hidden sm:block px-4 py-2 rounded-2xl bg-slate-700/50 border border-slate-600 text-slate-300 text-sm font-medium">
              Attempted:{" "}
              <span className="text-emerald-400 font-bold">
                {attemptedCount}
              </span>{" "}
              / {questions.length}
            </div>
            {/* we are including the Timer component to handle the countdown logic */}
            <Timer initialMinutes={5} />
          </div>
        </div>
      </header>

      {/* we are using main to wrap the list of questions with specific padding and width */}
      <main className="max-w-2xl mx-auto pt-8 px-4">
        {/* it creates a vertical gap between each question card */}
        <div className="space-y-6">
          {/* we are mapping through the questions array to render each question individually */}
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="bg-slate-800 p-8 rounded-2xl shadow-lg shadow-black/20 border border-slate-700 transition-hover"
            >
              {/* it displays the question number and the actual question text */}
              <h2 className="text-xl font-bold text-white mb-6 leading-relaxed">
                <span className="text-white mr-2">{index + 1}.</span>
                {q.question}
              </h2>

              <div className="space-y-3">
                {/* we are mapping through the options for each specific question */}
                {q.options.map((option, idx) => {
                  const naturalValue = idx + 1;
                  const isSelected = answers[q.id] === naturalValue;
                  const letters = ["A", "B", "C", "D"];

                  {/* it contains the button styles for the options, including logic for active and hover states */}
                  const baseClass =
                    "w-full flex items-center text-left p-4 rounded-xl border-2 font-medium group ";
                  const activeClass = isSelected
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:bg-slate-700 hover:text-white";

                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        dispatch(
                          setAnswer({ qId: q.id, selectedValue: naturalValue }),
                        )
                      }
                      className={baseClass + activeClass}
                    >
                      {/* we have created custom radio buttons that visually indicate if an option is selected */}
                      <div
                        className={
                          "w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300 " +
                          (isSelected
                            ? "border-emerald-500 scale-110"
                            : "border-slate-600 group-hover:border-emerald-400")
                        }
                      >
                        {/* we show the inner dot only when the specific option is selected by the user */}
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                        )}
                      </div>

                      {/* it displays the label letter for the option (A, B, C, or D) */}
                      <span
                        className={
                          "font-bold mr-3 " +
                          (isSelected
                            ? "text-emerald-400"
                            : "text-slate-500 group-hover:text-emerald-400")
                        }
                      >
                        {letters[idx] + "."}
                      </span>

                      {/* it displays the actual text of the quiz option */}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* we have placed the submit button at the bottom right to finalize the quiz */}
        <div className="pt-10 flex justify-end pb-20">
          <button
            onClick={() => dispatch(finishQuiz())}
            className="bg-emerald-600 text-white px-10 py-2 font-medium text-lg hover:bg-emerald-500 shadow-lg border border-emerald-500"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}

export default QuizModule;