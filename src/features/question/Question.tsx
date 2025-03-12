import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store.ts';
import { questionType } from '../../utils/type.ts';
import { setIsAnswered, setStatus, setTotalPoints } from './questionSlice.ts';
import { useEffect } from 'react';

function Question() {
  const dispatch: AppDispatch = useDispatch();
  const isAnswered: boolean = useSelector(
    (state: RootState): boolean => state.questions.isAnswered,
  );
  const currentQuestion: number = useSelector(
    (state: RootState): number => state.questions.currentQuestion,
  );
  const question: questionType = useSelector(
    (state: RootState) => state.questions.questions[currentQuestion],
  );
  const handleRespond = (id: number) => {
    dispatch(setIsAnswered(true));
    if (id === question.correctOption) {
      dispatch(setTotalPoints(question.points));
    }
    if (id === 14) setStatus('finished');
  };
  useEffect(() => {
    dispatch(setIsAnswered(false));
  }, [dispatch, currentQuestion]);

  return (
    <div className={'m-2'}>
      <h3>{question.question}</h3>
      <div className={'mt-1 flex flex-col gap-1 space-y-2.5'}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleRespond(index)}
            disabled={isAnswered}
            className={
              'disable cursor-pointer rounded-2xl border disabled:cursor-not-allowed ' +
              'w-full bg-[#495057] px-2 py-2 text-left text-2xl transition-all' +
              ' duration-300 ease-in-out hover:translate-x-[1.2rem] hover:bg-[#343a40]'
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
