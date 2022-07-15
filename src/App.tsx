import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/form-card';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <Card title="app">
        <h1>hola mundo</h1>
      </Card>
    </div>
  );
}

export default App;
