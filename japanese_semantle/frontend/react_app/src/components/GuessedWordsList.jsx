import * as React from "react"
import { useContext } from "react"
import { GuessedWordsContext } from "./HomePage"

export default function GuessedWordsList() {
  const { words } = useContext(GuessedWordsContext);
  return (
    <div>
      <ul>
        { 
          words.map((word) => 
            <li key={word}>{word}</li>
          ) 
        }
      </ul>
    </div>
  );
}