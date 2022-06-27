import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GuessedWordsContext } from "../pages/HomePage";

//components
import SubmitButton from "./SubmitButton";

export function Inputs({setFound}) {
  const [word, setWord] = useState();
  
  const handleChange = ({target}) => setWord(target.value);

  const { words, setWords, mostRecentWord, setMostRecentWord } = useContext(GuessedWordsContext);
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
      if (mostRecentWord) {
        setWords([mostRecentWord, ...words]);
      }
      setMostRecentWord({
        word: res.word,
        score: res.score,
        rank: res.rank,
      });
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

  useEffect(() => {
    //might make it slow due to the O(nlogn) sort
    setWords(words.sort((a,b) => {
      return b.score - a.score;
    }));
  }, [words, setWords]);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex">
        <input 
          className="bg-background shadow-md text-p text-sm text-h1 rounded-lg border-0 focus:ring-h1 focus:drop-shadow-xl w-full p-2.5 m-3 "
          type="text" 
          placeholder="記入してください"
          value ={word}
          onChange={handleChange}
        />
        <SubmitButton onClick={handleSubmit} name="送信" />
      </form>
    </>
  );
}