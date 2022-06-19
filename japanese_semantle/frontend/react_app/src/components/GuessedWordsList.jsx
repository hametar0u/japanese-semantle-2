import { useContext } from "react";
import { GuessedWordsContext } from "../pages/HomePage";

const GuessedWordsList = () => {
  const { words } = useContext(GuessedWordsContext);
  return (
    <div>
      <h3>前の言葉</h3>
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
};

export default GuessedWordsList;