const style = {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgb(145,71,142)"
};

const WinModal = ({restartGame}) => {
  return ( 
    <div style={style}>
      <h2>当たり！おめでとう！</h2>
      <button onClick={restartGame}>もう一回やろう？</button>
    </div>
  );
}
 
export default WinModal;