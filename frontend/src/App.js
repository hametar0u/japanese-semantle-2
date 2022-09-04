import React from 'react';
import HomePage from "./pages/HomePage";
import WordDatabase from "./pages/WordDatabase";
import Testpage from "./pages/Test";
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          element={<HomePage />}
        />
        <Route
          path="/load_words/:key"
          element={<WordDatabase />}
        />
        <Route
          path="/test"
          element={<Testpage />}
        />
      </Routes>
    </Router>
  );
}



export default App;