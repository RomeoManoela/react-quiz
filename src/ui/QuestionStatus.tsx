import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { questionType } from '../utils/type.ts';

function QuestionStatus() {
  const isAnswered: boolean = useSelector(
    (state: RootState) => state.questions.isAnswered,
  );
  const option: number = useSelector(
    (state: RootState) => state.questions.currentOption as number,
  );
  const currentQuestion: number = useSelector(
    (state: RootState) => state.questions.currentQuestion,
  );
  const question: questionType = useSelector(
    (state: RootState) => state.questions.questions[currentQuestion],
  );
  if (!isAnswered || !question) return null;

  return (
    <div className='fixed right-1 top-1 mb-4 w-[15rem]'>
      {question?.correctOption === option ? (
        <div
          role='alert'
          className='flex transform items-center rounded-lg border-l-4 border-green-500 bg-green-100 p-2 text-green-900 transition duration-300 ease-in-out hover:scale-105 hover:bg-green-200 dark:border-green-700 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800'
        >
          <svg
            stroke='currentColor'
            viewBox='0 0 24 24'
            fill='none'
            className='mr-2 h-5 w-5 flex-shrink-0 text-green-600'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              strokeWidth={2}
              strokeLinejoin='round'
              strokeLinecap='round'
            />
          </svg>
          <p className='text-xs font-semibold'>Good, correct option!</p>
        </div>
      ) : (
        <div
          role='alert'
          className='flex transform items-center rounded-lg border-l-4 border-red-500 bg-red-100 p-2 text-red-900 transition duration-300 ease-in-out hover:scale-105 hover:bg-red-200 dark:border-red-700 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800'
        >
          <svg
            stroke='currentColor'
            viewBox='0 0 24 24'
            fill='none'
            className='mr-2 h-5 w-5 flex-shrink-0 text-red-600'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              strokeWidth={2}
              strokeLinejoin='round'
              strokeLinecap='round'
            />
          </svg>
          <p className='text-xs font-semibold'>Oops - wrong answer.</p>
        </div>
      )}
    </div>
  );
}

export default QuestionStatus;
