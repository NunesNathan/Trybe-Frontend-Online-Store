import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Redirect from './pages/Redirect';
// import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Redirect />
    </BrowserRouter>
  );
}

export default App;
