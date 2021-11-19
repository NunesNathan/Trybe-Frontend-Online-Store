import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Redirect from './pages/Redirect';

function App() {
  return (
    <BrowserRouter>
      <Redirect />
    </BrowserRouter>
  );
}

export default App;
