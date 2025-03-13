import Header from './ui/Header.tsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store.ts';
import {
  fetchQuestions,
  getTotalPoints,
  nextQuestion,
  restartQuiz,
  setIsStarted,
} from './features/question/questionSlice.ts';
import Question from './features/question/Question.tsx';

function App() {
  const points: number = useSelector(getTotalPoints);
  const isAnswered: boolean = useSelector(
    (state: RootState): boolean => state.questions.isAnswered,
  );
  const quizStatus: string = useSelector(
    (state: RootState): string => state.questions.status,
  );
  const totalPoints: number = useSelector(
    (state: RootState): number => state.questions.totalPoints,
  );
  const isStarted: boolean = useSelector(
    (state: RootState): boolean => state.questions.isStarted,
  );
  const currentQuestion: number = useSelector(
    (state: RootState): number => state.questions.currentQuestion,
  );
  const dispatch: AppDispatch = useDispatch();

  const handleStartQuiz = () => {
    dispatch(restartQuiz());
  };

  useEffect(() => {
    if (quizStatus === 'finished') setIsStarted(false);
  }, [quizStatus]);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div>
      <Header isStarted={isStarted} />
      {quizStatus === 'finished' ? (
        <div className='mx-auto w-[45rem] p-5 text-center text-white'>
          <h2 className='text-[3rem] tracking-widest md:text-[4rem]'>
            Your score is {totalPoints}
            {100 <= totalPoints &&
              totalPoints < 230 &&
              '  You are a React Apprentice'}
            {totalPoints >= 230 && '  You are a React Master'}
          </h2>
          <button
            onClick={handleStartQuiz}
            className='rounded-2xl border border-dashed border-white px-5 py-1.5 transition-all duration-300 hover:bg-white hover:text-black'
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <main className='mx-auto w-[45rem] p-5 text-center text-white'>
            {!isStarted ? (
              <button
                onClick={() => dispatch(setIsStarted(true))}
                className='rounded-2xl border border-dashed border-white px-5 py-1.5 transition-all duration-300 hover:bg-white hover:text-black'
              >
                Start Quiz
              </button>
            ) : (
              <>
                <p>Question {currentQuestion + 1} of 15</p>
                <p>
                  Score: {totalPoints} / {points}
                </p>
                <Question />
                <div>
                  {isAnswered && (
                    <button
                      onClick={() => dispatch(nextQuestion())}
                      className='rounded-2xl border border-dashed border-white px-5 py-1.5 transition-all duration-300 hover:bg-white hover:text-black'
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
