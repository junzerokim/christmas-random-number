// App.js
import React from 'react';
import RandomNumberGenerator from './RandomNumberGenerator';
import { Reset } from 'styled-reset';

const App = () => {
  return (
    <div className="App">
      <Reset />
      <RandomNumberGenerator />
    </div>
  );
};

export default App;
