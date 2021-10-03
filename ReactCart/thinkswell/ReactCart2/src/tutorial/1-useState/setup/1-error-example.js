import React from "react";

const ErrorExample = () => {
  let title = "Random title";
  const handleClick = () => {
    title = "Hello World!!";
    console.log(title);
  };
  return (
    <React.Fragment>
      <h1>{title}</h1>
      <button className="btn" onClick={handleClick}>
        Change Title
      </button>
    </React.Fragment>
  );
};

export default ErrorExample;
