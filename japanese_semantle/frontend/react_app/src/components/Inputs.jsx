import React, { useState, useContext } from "react";
import axios from "axios";
import { GuessedWordsContext } from "../pages/HomePage";

export function Inputs() {
  const [word, setWord] = useState();
  const handleChange = ({target}) => setWord(target.value);

  const { words, setWords } = useContext(GuessedWordsContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    //insert database call
    axios.post(`http://localhost:8000/api/evaluate_word/${word}`, {})
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err.response);
    })
    setWords([...words, word]);
    setWord('');
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