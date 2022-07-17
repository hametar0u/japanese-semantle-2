import SubmitButton from "./SubmitButton";
import Confetti from 'react-confetti';
import { motion } from "framer-motion";

const backdrop = {
  visible: { opacity: 0.85 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { 
    y: "200px", 
    opacity: 1,
    transition: { delay: 0.5 }
  },
};

const WinModal = (props) => {
  return ( 
    <>
    <motion.div 
      class="overlay-modal" 
      className="bg-black opacity-[75%] fixed top-0 w-screen h-screen z-10" 
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      >
      <Confetti/>
    </motion.div>
    <motion.div 
      class="container" 
      className="bg-cardbg fixed w-1/3 left-1/2 -ml-[16.666667%] top-1/6 rounded-xl p-10 z-20 text-center"
      variants={modal}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
        <h2 className="font-bold text-5xl text-h1 text-center mt-5 mb-6">当たり！</h2>
        <p className="text-p mb-2 text-xl">
          {props.numTries}回目で成功した！
        </p>
        <SubmitButton onClick={props.restartGame} name="もう一回やろう？" style="mt-10"/>
      </motion.div>
    </>
  );
}
 
export default WinModal;