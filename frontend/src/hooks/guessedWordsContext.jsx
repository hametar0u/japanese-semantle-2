// import * as React from "react";

// const guessedWordsDataContext = React.createContext();

// export const guessedWordsDataProvider = (props) => {
//   const [guessedWords, setGuessedWords] = React.useState();
//   React.useEffect(() => {
//     const currentData = [];
//     setGuessedWords(currentData);
//   }, []);

//   return (
//     <guessedWordsDataContext.Provider value={{ guessedWords, setGuessedWords }}>
//       {props.children}
//     </guessedWordsDataContext.Provider>
//   );
// }

// export const useGuessedWordsData = () => React.useContext(guessedWordsDataContext);