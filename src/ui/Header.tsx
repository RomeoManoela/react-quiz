import Title from './Title.tsx';
import QuestionStatus from './QuestionStatus.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store.ts';

function Header({ isStarted }: { isStarted: boolean }) {
  const finished: boolean = useSelector(
    (state: RootState) => state.questions.status === 'finished',
  );
  return (
    <header className={'mx-auto w-[66rem] p-5 text-center text-white'}>
      <Title />
      {!finished && <QuestionStatus />}
      {!isStarted && (
        <p className={'text-[1.3rem] md:text-[1.6rem]'}>
          Their are 15 questions to test your React knowledge
        </p>
      )}
    </header>
  );
}

export default Header;
