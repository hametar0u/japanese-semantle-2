
const SubmitButton = (props) => {
  return ( 
    <button className={`${props.style} bg-highlight hover:bg-secondary hover:shadow-md w-64 font-extrabold text-h1 h-12 rounded-xl text-lg m-3`} onClick={props.onClick}>{props.name}</button>
  );
}
 
export default SubmitButton;