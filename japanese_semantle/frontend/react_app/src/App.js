import React from 'react';
import HomePage from "./pages/HomePage";
import WordDatabase from "./pages/WordDatabase";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  // return (
  //   <div className="App">
  //        <HomePage />
  //   </div>
  // );
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
      </Routes>
    </Router>
  );
}



export default App;