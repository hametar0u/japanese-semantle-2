import SubmitButton from "./SubmitButton";

const WinModal = ({restartGame}) => {
  return ( 
    <div class="overlay-modal" className="bg-background fixed top-0 w-screen h-screen p-20">
      <div class="container" className="bg-cardbg flex-col justify-center items-center rounded-lg m-72 p-5">
        <h2 className="font-bold text-2xl text-h1 mt-2 mb-2">当たり！</h2>
        <p className="text-p">
          ＿回目で成功した！
        </p>
        <SubmitButton onClick={restartGame} name="もう一回やろう？" />
      </div>
    </div>
  );
}
 
export default WinModal;