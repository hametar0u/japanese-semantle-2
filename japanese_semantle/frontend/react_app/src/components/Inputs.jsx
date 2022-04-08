import React, { useState } from "react";

export function Inputs() {
  const [word, setWord] = useState();
  const handleChange = ({target}) => setWord(target.value);

  function evaluateGuess() {
    //TODO: perform POST request to server
    console.log("evaluate guess");
  }

  return (
    <>
      <form onSubmit={ () => evaluateGuess }>
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