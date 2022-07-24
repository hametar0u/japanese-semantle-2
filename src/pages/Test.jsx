import { useState } from 'react';
import InfoModal from "../components/InfoModal";

const Testpage = () => {
  const [text, setText] = useState();
  return ( 
    <div className="flex h-screen justify-center items-center">
      <InfoModal />
     
    </div>
  );
}
 
export default Testpage;