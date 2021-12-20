import './App.css'
import Form from './components/Form'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p style={styles.title}>
          Information system!
        </p>
        <Form />
      </header>
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
