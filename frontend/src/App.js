import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login';
import SignUp from './pages/signup';
import GameCard from './pages/select_game';
import ColorGame from './pages/games/colors/color_game';
import ColorGame2 from './pages/games/colors/color_game2';
import NumGame from './pages/games/numbers/num_game';
import NumGame2 from './pages/games/numbers/num_game2';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select_game" element={<GameCard />} />
        <Route path="/num_game" element={<NumGame />} />
        <Route path="/num_game2" element={<NumGame2 />} />
        <Route path="/color_game" element={<ColorGame />} />
        <Route path="/color_game2" element={<ColorGame2 />} />
      </Routes>
    </Router>
  )
}

export default App;