const CloseButton = (props) => {
  return (
    <button className="bg-highlight hover:bg-secondary w-5 h-5 align-center items-center text-xs rounded-full text-h1 ml-auto" onClick={props.onClick}>
      {props.name}
    </button>
  );
};

export default CloseButton;
