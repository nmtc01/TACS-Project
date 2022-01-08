import './scss/style.scss';
import { TheLayout } from './containers';

function App() {
  return (
    <div className="App">
      <TheLayout />
    </div>
  );
}

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: 25
  },
}

export default App;
