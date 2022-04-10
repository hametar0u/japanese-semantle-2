import * as React from "react";
import { useState, createContext } from "react";
import { Inputs } from "../components/Inputs";
import GuessedWordsList from "../components/GuessedWordsList"
import { Link } from "react-router-dom";
// import { guessedWordsDataProvider, useGuessedWordsData } from "../hooks/guessedWordsContext"

export const GuessedWordsContext = createContext({
  words: [],
  setWords: () => {},
});

export default function HomePage() {
  const [words, setWords] = useState([]);

  return (
    <>
    <GuessedWordsContext.Provider value={{words, setWords}}>
      <h1>Home Page</h1>
      <Inputs />
      <GuessedWordsList />
    </GuessedWordsContext.Provider>

    <Link to={`load_words/882`}>Go to word database</Link>
    </>
  );
}