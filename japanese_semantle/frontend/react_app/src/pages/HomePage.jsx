import axios from "axios";
import { useState, createContext } from "react";
import { Link } from "react-router-dom";

//components
import NavButton from "../components/NavButton";
import { Inputs } from "../components/Inputs";
import GuessedWordsList from "../components/GuessedWordsList";
import SubmitButton from "../components/SubmitButton";
import WinModal from "../components/WinModal";
import ExplanationModal from "../components/ExplanationModal";
// import { guessedWordsDataProvider, useGuessedWordsData } from "../hooks/guessedWordsContext"

//style stuff
import AnimatedText from 'react-animated-text-content';
import CountUp from 'react-countup';

export const GuessedWordsContext = createContext({
  words: [],
  setWords: () => {},
  mostRecentWord: null,
  setMostRecentWord: () => {},
});

export default function HomePage() {
  const [words, setWords] = useState([]);
  const [mostRecentWord, setMostRecentWord] = useState();
  const [found, setFound] = useState(false);
  const [explanationModalOpen, setExplanationModalOpen] = useState(false);
  const [startNum, setStartNum] = useState();

  const restartGame = () => {
    setWords([]);
    setMostRecentWord();
    setFound(false);
    alert("リセットした");
  };

  const newGame = () => {
    axios
      .post(`http://localhost:8000/api/new_game`, {})
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setWords([]);
    setMostRecentWord();
    setFound(false);
    alert("新しいゲームが作られました。");
  };

  return (
    <div className="bg-background">
      <div className="flex justify-end">
        <h1 className="text-4xl font-bold leading-normal m-3 text-h1 mr-auto">
          M向けのゲーム
        </h1>
        <NavButton onClick={() => setExplanationModalOpen(true)} name="説明" />
        <NavButton onClick={newGame} name="新ゲーム" />
      </div>
      {found && <WinModal restartGame={restartGame} />}
      {explanationModalOpen && (
        <ExplanationModal setClose={() => setExplanationModalOpen(false)} />
      )}
      <div className="flex justify-center bg-background h-full w-screen">
        <div className="flex-col items-center w-9/12 xl:w-7/12 2-xl:w-5/12 max-w-[800px]">
        <div class="divider" className="h-20" />
          <GuessedWordsContext.Provider
            value={{ words, setWords, mostRecentWord, setMostRecentWord }}
          >
            
            {/* <div className="flex"> */}
              <div className="flex-1 mb-10 p-10 bg-cardbg rounded-xl">
                <h3 className="text-3xl font-bold text-center p-3">
                  ここで当たってみて
                </h3>
                <Inputs setFound={setFound} />
              </div>
              {mostRecentWord && (
                <div className="p-10 mb-10 bg-cardbg rounded-xl">
                  <h3 className="text-3xl font-bold text-center text-h1 p-3">
                    今のゲス
                  </h3>
                  <div className="relative overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full text-md text-left text-h1 shadow-md overflow-hidden">
                      <thead className="bg-background text-center text-3xl lg:text-5xl">
                        <th className="p-7 pb-2">
                            <AnimatedText
                              type="words"
                              animationType="bounce"
                              duration={0.2}
                            >
                              {mostRecentWord.word}
                            </AnimatedText>
                        </th>
                        <th className="p-7 pb-0">
                          <CountUp 
                            end={mostRecentWord.score * 100 / 100} 
                            duration={1}
                            delay={1}
                            decimals={2}
                          />
                        </th>
                        <th className="p-7 pb-0">
                          {mostRecentWord.rank ? (
                            <CountUp 
                              start={startNum}
                              end={mostRecentWord.rank} 
                              delay={3}
                              duration={1}
                              onStart={() => setStartNum(1000)}
                            />
                          ) : (
                            <AnimatedText
                              type="words"
                              animationType="bounce"
                              duration={0.2}
                            >
                              なし
                            </AnimatedText>
                          )}
                        </th>
                      </thead>
                      <tr className="bg-background text-center font-bold">
                        <td className="p-7 pt-0">言葉</td>
                        <td className="p-7 pt-0">スコア</td>
                        <td className="p-7 pt-0">ランキング</td>
                      </tr>
                    </table>
                  </div>
                </div>
              )}
            {/* </div> */}
            {words.length !== 0 && <GuessedWordsList />}
          </GuessedWordsContext.Provider>

          <br />
          <Link to={`load_words/882`}>Go to word database</Link>
        </div>
      </div>
    </div>
  );
}

//temporary
const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
