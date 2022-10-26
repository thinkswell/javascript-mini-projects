import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./Home.scss";
import logo from "../../assets/main-logo.png";
const Home: React.FC = () => {
  const [repoName, setRepoName] = useState("");
  let history = useHistory();
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push(`/search/${repoName}`);
  };
  return (
    <>
      <div className="home">
        <div className="img-container">
          <img src={logo} alt="" />
        </div>
        <form onSubmit={submitForm} className="form">
          <div className="formGroup">
            <input
              className="formControl"
              name="repoName"
              id="repoName"
              type="text"
              value={repoName}
              onChange={e => setRepoName(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
