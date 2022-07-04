import SubmitButton from "./SubmitButton";

const WinModal = (props) => {
  return ( 
    <>
    <div class="overlay-modal" className="bg-background fixed top-0 w-screen h-screen z-10">
    </div>
      <div class="container" className="bg-cardbg fixed w-1/3 -ml-[16.666667%] top-1/4 left-1/2 rounded-xl p-10 z-20 text-center">
        <h2 className="font-bold text-5xl text-h1 text-center mt-5 mb-6">当たり！</h2>
        <p className="text-p mb-2">
          ＿回目で成功した！
        </p>
        <SubmitButton onClick={props.restartGame} name="もう一回やろう？" style="mt-10"/>
      </div>
    </>
  );
}
 
export default WinModal;