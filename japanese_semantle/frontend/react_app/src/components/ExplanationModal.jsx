import CloseButton from "./CloseButton";

const ExplanationModal = ({setClose}) => {
  return ( 
    <div class="overlay-modal" className="bg-background fixed top-0 w-screen h-screen p-20">
      <div class="container" className="bg-cardbg flex-col justify-start items-center rounded-lg m-72 p-5">
        <div className="flex items-start">
          <h2 className="font-bold text-2xl text-h1 mt-2 mb-2">説明</h2>
          <CloseButton onClick={setClose} name="x" />
        </div>
        <p className="text-p">
          俺様のゲームへようこそ！このゲームの目的は簡単に秘密な言葉を当てることです！当てる時、二つの情報が用意してあります。一つ目はスコアです。これは今送信した言葉と秘密の言葉の近さの測定になる。
          後、千目＿の言葉はランキングもついている。一番近い言葉は２位って与えられます（１位は秘密の言葉ので）。
          何回も当てることができるけど、友達に見下ろされるかもしれないので、最小なトライで当てるように目指しましょう！ちなみにネーティブにもクソむずいらしいので、できなくてもご心配なく！
        </p>
      </div>
    </div>
  );
}
 
export default ExplanationModal;