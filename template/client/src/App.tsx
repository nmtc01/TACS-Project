import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'
import React, {Suspense} from 'react';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={loading}>
          <Switch>
            <Route path='/' component={TheLayout} />
          </Switch>
        </Suspense>
      </HashRouter>
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
