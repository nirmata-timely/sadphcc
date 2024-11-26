const Button = ({ to }) => {
  return (
    <a href={`/${to}`}>
      <button className="Button">{to === "" ? "Login" : to}</button>
    </a>
  );
};

export default Button;
