import Header from './ui/Header.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store.ts';
import {
  fetchQuestions,
  nextQuestion,
} from './features/question/questionSlice.ts';
import Question from './features/question/Question.tsx';

function App() {
  const isAnswered: boolean = useSelector(
    (state: RootState): boolean => state.questions.isAnswered,
  );
  const quizStatus: string = useSelector(
    (state: RootState): string => state.questions.status,
  );
  const totalPoints: number = useSelector(
    (state: RootState): number => state.questions.totalPoints,
  );
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const currentQuestion = useSelector(
    (state: RootState): number => state.questions.currentQuestion,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div>
      {quizStatus === 'finished' ? (
        <div className='mx-auto w-[45rem] p-5 text-center text-white'>
          <h1 className='text-[3rem] tracking-widest md:text-[4rem]'>
            Your score is {totalPoints}
          </h1>
        </div>
      ) : (
        <div>
          <Header isStarted={isStarted} />
          <main className='mx-auto w-[45rem] p-5 text-center text-white'>
            {!isStarted ? (
              <button
                onClick={() => setIsStarted(true)}
                className='rounded-2xl border border-dashed border-white px-5 py-1.5 transition-all duration-300 hover:bg-white hover:text-black'
              >
                Start Quiz
              </button>
            ) : (
              <>
                <p>Question {currentQuestion} of 15</p>
                <p>Score: {totalPoints}</p>
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
