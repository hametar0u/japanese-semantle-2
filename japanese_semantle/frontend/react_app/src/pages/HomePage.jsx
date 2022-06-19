import * as React from "react";
import { useState, createContext } from "react";
import { Inputs } from "../components/Inputs";
import GuessedWordsList from "../components/GuessedWordsList";
import WinModal from "../components/WinModal";
import ExplanationModal from "../components/ExplanationModal";

import { Link } from "react-router-dom";
// import { guessedWordsDataProvider, useGuessedWordsData } from "../hooks/guessedWordsContext"

export const GuessedWordsContext = createContext({
  words: [],
  setWords: () => {},
});

export default function HomePage() {
  const [words, setWords] = useState([]);
  const [found, setFound] = useState(false);
  const [explanationModalOpen, setExplanationModalOpen] = useState(false);

  const restartGame = () => {
    setWords([]);
    setFound(false);
  };

  return (
    <div class="Homepage" style={containerStyle}>
      <GuessedWordsContext.Provider value={{words, setWords}}>
        {found && <WinModal restartGame={restartGame}/>}
        {explanationModalOpen && <ExplanationModal setClose={() => setExplanationModalOpen(false)} />}
        <h1>M向けのゲーム</h1>
        <Inputs setFound={setFound} />
        <button onClick={() => setExplanationModalOpen(true)}>?</button>
        {words.length !== 0 && <GuessedWordsList />}
      </GuessedWordsContext.Provider>

      <br />
      <Link to={`load_words/882`}>Go to word database</Link>
    </div>
  );
};

//temporary
const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};