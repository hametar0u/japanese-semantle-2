import CloseButton from "./CloseButton";
import { motion } from "framer-motion";

const backdrop = {
  visible: { opacity: 0.75 },
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
const ExplanationModal = ({setClose}) => {
  return ( 
    <>
    <motion.div 
      class="overlay-modal" 
      className="bg-black opacity-[75%] fixed top-0 w-screen h-screen z-10" 
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    />
    <motion.div 
      class="container" 
      className="bg-cardbg fixed w-1/3 left-1/2 -ml-[16.666667%] top-1/6 rounded-xl p-10 z-20"
      variants={modal}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex items-start">
        <h2 className="font-bold text-2xl text-h1 mb-6">説明</h2>
        <CloseButton onClick={setClose} name="x" />
      </div>
      <p className="text-p leading-8">
        俺様のゲームへようこそ！このゲームの目的は簡単に秘密な言葉を当てることです！当てる時、二つの情報が用意してあります。一つ目はスコアです。これは今送信した言葉と秘密の言葉の近さの測定になる。
        後、トップ千目の言葉はランキングもついている。一番近い言葉は２位って与えられます（１位は秘密の言葉ので）。
        何回も当てることができるけど、友達に見下ろされるかもしれないので、最小なトライで当てるように目指しましょう！ちなみにネーティブにもクソむずいらしいので、できなくてもご心配なく！
      </p>
    </motion.div>
    </>
  );
}
 
export default ExplanationModal;