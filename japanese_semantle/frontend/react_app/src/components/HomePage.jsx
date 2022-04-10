import * as React from "react";
import { useState, createContext, useEffect } from "react";
import { Inputs } from "./Inputs";
import GuessedWordsList from "./GuessedWordsList"
import axios from "axios"
// import { guessedWordsDataProvider, useGuessedWordsData } from "../hooks/guessedWordsContext"

export const GuessedWordsContext = createContext({
  words: [],
  setWords: () => {},
});

export default function HomePage() {
  const [words, setWords] = useState([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/load_daily_top_1000/882`
        );
        setData(response.data["response"]);
        console.log(typeof data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
    <GuessedWordsContext.Provider value={{words, setWords}}>
      <h1>Home Page</h1>
      <Inputs />
      <GuessedWordsList />
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {data && data.map(word => (
          <li key={word.rank}>
            {word.rank} - {word.word} - {word.score}
          </li>
        ))}
      </ul>
    </GuessedWordsContext.Provider>
    </>
  );
}