import * as React from "react"
import { useContext } from "react"
import { GuessedWordsContext } from "../pages/HomePage"

export default function GuessedWordsList() {
  const { words } = useContext(GuessedWordsContext);
  return (
    <div>
      <ul>
        { 
          words.map((word) => 
            <li key={word.word}>{word.word} - {Math.round(word.score * 100) / 100} - {word.rank}</li>
          ) 
        }
      </ul>
    </div>
  );
}