import { useContext } from "react";
import { GuessedWordsContext } from "../pages/HomePage";

const GuessedWordsList = () => {
  const { words } = useContext(GuessedWordsContext);
  return (
    <div className="p-10 mb-10 bg-cardbg rounded-xl">
      <h3 className="text-3xl font-bold text-center p-3">試した言葉</h3>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-md text-center text-h1">
          <thead className="bg-secondary">
            <th className="px-6 py-3">言葉</th>
            <th className="px-6 py-3">スコア</th>
            <th className="px-6 py-3">ランキング</th>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr className="bg-background border-t border-cardbg">
                <td className="px-6 py-3">{word.word}</td>
                <td className="px-6 py-3">
                  {Math.round(word.score * 100) / 100}
                </td>
                <td className="px-6 py-3">
                  {word.rank ? <p>{word.rank}</p> : <p>なし</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuessedWordsList;
