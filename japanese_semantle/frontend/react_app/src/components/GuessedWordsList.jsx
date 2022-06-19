import * as React from "react"
import { useContext } from "react"
import { GuessedWordsContext } from "../pages/HomePage"

export default function GuessedWordsList() {
  const { words } = useContext(GuessedWordsContext);
  return (
    <div>
      <table>
        <th>言葉</th>
        <th>スコア</th>
        <th>ランキング</th>
        { 
          words.map((word) => 
            <tr>
              <td>{word.word}</td>
              <td>{Math.round(word.score * 100) / 100}</td>
              <td>{word.rank}</td>
            </tr>

          ) 
        }
      </table>
    </div>
  );
}