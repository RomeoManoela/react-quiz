import Title from './Title.tsx';

function Header({ isStarted }: { isStarted: boolean }) {
  return (
    <header className={'mx-auto w-[66rem] p-5 text-center text-white'}>
      <Title />
      {!isStarted && (
        <p className={'text-[1.3rem] md:text-[1.6rem]'}>
          Their are 15 questions to test your React knowledge
        </p>
      )}
    </header>
  );
}

export default Header;
