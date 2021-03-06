import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
          Learn React --- XMLIANG V1.0.3
        </a>
        <button type="button" onClick={() => {
         window.history.back()
        }
        }>后退</button>
        <button type="button" onClick={() => {
          window.top?.close(); return false
        }
        }>关闭</button>
      </header>
    </div>
  );
}

export default App;
