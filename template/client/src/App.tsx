import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './views/HomePage';
import GetAllPage from './views/GetAllPage';

function App() {
//TODO
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/client' element={<GetAllPage name='client' />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: 25
  },
}

export default App;
