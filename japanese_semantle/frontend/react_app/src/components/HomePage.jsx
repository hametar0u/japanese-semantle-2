import * as React from "react";
import { useState, createContext, useMemo } from "react";
import { Inputs } from "./Inputs";
import GuessedWordsList from "./GuessedWordsList"
// import { guessedWordsDataProvider, useGuessedWordsData } from "../hooks/guessedWordsContext"

export const GuessedWordsContext = createContext({
  words: [],
  setWords: () => {},
});

export default function HomePage() {
  const [words, setWords] = useState(['john']);
  const value = useMemo(
    () => ({ words, setWords }), 
    [words]
  );

  return (
    <>
    <GuessedWordsContext.Provider value={value}>
      <h1>Home Page</h1>
      <Inputs />
      <GuessedWordsList />
    </GuessedWordsContext.Provider>
    </>
  );
}