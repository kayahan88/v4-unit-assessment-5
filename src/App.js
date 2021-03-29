import React from 'react';
import routes from './routes';
import Nav from './Components/Nav/Nav';
import './App.css';

function App() {
  return (
    <div>
      <div className='App'>

      <Nav />
      {routes}

      </div>
    </div>
  )
};

export default App;
