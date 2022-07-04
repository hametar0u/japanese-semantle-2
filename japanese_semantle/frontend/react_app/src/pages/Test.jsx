import AnimatedText from 'react-animated-text-content';
import { useState } from 'react';

const randomNumber = () => Math.floor(Math.random() * 9999999999 + 100000);

const Testpage = () => {
  const [text, setText] = useState();
  return ( 
    <div className="flex h-screen justify-center items-center">
      <button onClick={() => setText(randomNumber())}>change</button>
      <AnimatedText
        className="text-6xl text-bold"
        type="words"
        animationType="bounce"
        duration={0.2}
      >
        {text}
      </AnimatedText>
     
    </div>
  );
}
 
export default Testpage;