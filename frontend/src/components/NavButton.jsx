const NavButton = (props) => {
  return (
    <button
      className="bg-tertiary hover:bg-secondary hover:shadow-md w-64 font-extrabold text-h1 h-12 rounded-xl text-lg m-3"
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default NavButton;
