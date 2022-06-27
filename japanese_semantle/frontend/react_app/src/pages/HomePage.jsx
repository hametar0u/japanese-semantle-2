import axios from "axios";
import { useState, createContext } from "react";
import NavButton from "../components/NavButton";
import { Inputs } from "../components/Inputs";
import GuessedWordsList from "../components/GuessedWordsList";
import WinModal from "../components/WinModal";
import ExplanationModal from "../components/ExplanationModal";


import { Link } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
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
    setMostRecentWord();
    setFound(false);
  };

  const newGame = () => {
    axios.post(`http://localhost:8000/api/new_game`, {})
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err.response);
    });
    setWords([]);
    setMostRecentWord();
    setFound(false);
  };

  return (
    <>
      <div>
        <NavButton onClick={() => setExplanationModalOpen(true)} name="説明" />
        <NavButton onClick={newGame} name="新ゲーム" />
      </div>
      {found && <WinModal restartGame={restartGame}/>}
      {explanationModalOpen && <ExplanationModal setClose={() => setExplanationModalOpen(false)} />}
    <div className="flex justify-center bg-background h-screen w-screen">
      <div className="flex-col items-center w-1/2">
        <GuessedWordsContext.Provider value={{words, setWords, mostRecentWord, setMostRecentWord}}>
          <h1 className="text-4xl font-bold leading-normal mt-0 mb-2 text-h1">M向けのゲーム</h1>
          <Inputs setFound={setFound} />
          {mostRecentWord && 
          <div className="m-3">
            <h3 className="text-xl font-bold text-center p-3">今のゲス</h3>
            <table className="w-full text-sm text-left text-h1 shadow-md">
            <thead className="bg-secondary">
              <th className="px-6 py-3">言葉</th>
              <th className="px-6 py-3">スコア</th>
              <th className="px-6 py-3">ランキング</th>
            </thead>
              <tr className="bg-cardbg border-t border-background">
                <td className="px-6 py-3">{mostRecentWord.word}</td>
                <td className="px-6 py-3">{Math.round(mostRecentWord.score * 100) / 100}</td>
                <td className="px-6 py-3">{mostRecentWord.rank ? <p>mostRecentWord.rank</p> : <p>なし</p>}</td>
              </tr>
            </table>
          </div>
          }
          {words.length !== 0 && <GuessedWordsList />}
        </GuessedWordsContext.Provider>

        <br />
        <Link to={`load_words/882`}>Go to word database</Link>
      </div>
    </div>
    </>
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