import { useContext } from "react";
import { GuessedWordsContext } from "../pages/HomePage";

const GuessedWordsList = () => {
  const { words } = useContext(GuessedWordsContext);
  return (
    <div className="m-3">
      <h3 className="text-xl font-bold text-center p-3">前の言葉</h3>
      <table className="w-full text-sm text-left text-h1 shadow-md">
        <thead className="bg-secondary">
            <th className="px-6 py-3">言葉</th>
            <th className="px-6 py-3">スコア</th>
            <th className="px-6 py-3">ランキング</th>
        </thead>
        <tbody>
        { 
          words.map((word) => 
            <tr className="bg-cardbg border-t border-background">
              <td className="px-6 py-3">{word.word}</td>
              <td className="px-6 py-3">{Math.round(word.score * 100) / 100}</td>
              <td className="px-6 py-3">{word.rank ? <p>word.rank</p> : <p>なし</p>}</td>
            </tr>

          ) 
        }
        </tbody>
      </table>
    </div>
  );
};

export default GuessedWordsList;