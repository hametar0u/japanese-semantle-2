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
  mostRecentWord: null,
  setMostRecentWord: () => {},
});

export default function HomePage() {
  const [words, setWords] = useState([]);
  const [mostRecentWord, setMostRecentWord] = useState();
  const [found, setFound] = useState(false);
  const [explanationModalOpen, setExplanationModalOpen] = useState(false);

  const restartGame = () => {
    setWords([]);
    setFound(false);
  };

  return (
    <div class="Homepage" style={containerStyle}>
      <GuessedWordsContext.Provider value={{words, setWords, mostRecentWord, setMostRecentWord}}>
        {found && <WinModal restartGame={restartGame}/>}
        {explanationModalOpen && <ExplanationModal setClose={() => setExplanationModalOpen(false)} />}
        <h1>M向けのゲーム</h1>
        <Inputs setFound={setFound} />
        <button onClick={() => setExplanationModalOpen(true)}>?</button>
        {mostRecentWord && 
        <>
          <h3>最近の言葉</h3>
          <table>
            <th>言葉</th>
            <th>スコア</th>
            <th>ランキング</th>
            <tr>
              <td>{mostRecentWord.word}</td>
              <td>{Math.round(mostRecentWord.score * 100) / 100}</td>
              <td>{mostRecentWord.rank}</td>
            </tr>
          </table>
        </>
        }
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