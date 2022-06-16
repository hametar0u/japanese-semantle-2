import React, { useState, useContext } from "react";
import axios from "axios";
import { GuessedWordsContext } from "../pages/HomePage";

export function Inputs({setFound}) {
  const [word, setWord] = useState();
  
  const handleChange = ({target}) => setWord(target.value);

  const { words, setWords } = useContext(GuessedWordsContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const unique = words.filter((word_obj) => {
      return word_obj.word === word;
    });
    if (unique.length !== 0) {
      alert('この言葉はもう試した！他の言葉に当たってみてください！');
      setWord('');
    }
    else {
      evaluateGuess();
    }
  };

  const evaluateGuess = () => {
    //insert database call
    axios.post(`http://localhost:8000/api/evaluate_word/${word}`, {})
    .then(response => {
      console.log(response.data);
      const res = response.data;
      
      setWords([...words, {
        word: res.word,
        score: res.score,
        rank: res.rank,
      }]);
    })
    .catch(err => {
      console.log(err.response);
      if (err.response.status === 302) {
        setFound(true);
      } else {
        alert('知らない言葉です！');
      }
    })
    setWord('');
  };

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