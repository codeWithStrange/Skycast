import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import MainApp from './Pages/Main/MainApp';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
           <Route path="/" element={<Landing />} />
          <Route path="/mainapp" Component={MainApp} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
