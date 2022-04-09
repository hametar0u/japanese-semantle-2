import React, { useState, useContext } from "react";
import { GuessedWordsContext } from "./HomePage"

export function Inputs() {
  const [word, setWord] = useState();
  const handleChange = ({target}) => setWord(target.value);

  const { words, setWords } = useContext(GuessedWordsContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setWords([...words, word])
  };

  function evaluateGuess() {
    //TODO: perform POST request to server
    console.log("evaluate guess");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="記入してください"
          value ={word}
          onChange={handleChange}
        />
        <input 
          type="submit"
        />
      </form>
    </>
  );
}