import { useEffect, useState } from 'react';

const randomNumber = () => Math.floor(Math.random() * 9999999999 + 100000);

const Testpage = () => {
  const [text, setText] = useState();
  return ( 
    <div>
      <button onClick={() => setText(randomNumber())}>change</button>
      <h1>
        
      </h1>
     
    </div>
  );
}
 
export default Testpage;