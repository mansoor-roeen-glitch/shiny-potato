// Dependencies
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

// Route Components
import Home from './routes/Home';
import Search from './routes/Search'

export default function App() {

  // Component Variables

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </Router>
  );
}
