const style = {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "grey"
};

const style2 = {
  width: "50%",
  height: "50%",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: "20px",
  alignItems: "center",
  backgroundColor: "white"
};

const ExplanationModal = ({setClose}) => {
  return ( 
    <div class="overlay-modal" style={style}>
      <div class="container" style={style2}>
        <h2>説明</h2>
        <p>
          俺様のゲームへようこそ！このゲームの目的は簡単に秘密な言葉を当てることです！当てる時、二つの情報が用意してあります。一つ目はスコアです。これは今送信した言葉と秘密の言葉の近さの測定になる。
          後、千目＿の言葉はランキングもついている。一番近い言葉は２位って与えられます（１位は秘密の言葉ので）。
          何回も当てることができるけど、友達に見下ろされるかもしれないので、最小なトライで当てるように目指しましょう！ちなみにネーティブにもクソむずいらしいので、できなくてもご心配なく！
        </p>
        <button onClick={setClose}>x</button>
      </div>
    </div>
  );
}
 
export default ExplanationModal;