import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  placesFound: number;
};

function App({ placesFound }: AppScreenProps): JSX.Element {
  return (
    <MainScreen placesFound={placesFound} />
  );
}

export default App;
