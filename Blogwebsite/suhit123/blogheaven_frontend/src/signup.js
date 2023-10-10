import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const [responseerr, setResponseerr] = useState({
    usernameerr: "",
    emailerr: "",
    username_email_err: "",
  });

  const setcookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/createaccount`, user)
      .then((res) => {
        console.log(res.data.token);
        setcookie("Athentication", res.data.token, 1);
        document.location.href = "/";
      })
      .catch((err) => {
        let errresponse = err.response.data;
        if (errresponse === "Username and Email already exist!") {
          setResponseerr({
            usernameerr: "",
            emailerr: "",
            username_email_err: (
              <p>
                <span>&#9888;</span>
                {`${" " + errresponse}`}
              </p>
            ),
          });
        } else if (errresponse === "Username already exist!") {
          setResponseerr({
            usernameerr: (
              <p>
                <span>&#9888;</span>
                {`${" " + errresponse}`}
              </p>
            ),
            emailerr: "",
            username_email_err: "",
          });
        } else if (errresponse === "Email already exist!") {
          setResponseerr({
            usernameerr: "",
            emailerr: (
              <p>
                <span>&#9888;</span>
                {`${" " + errresponse}`}
              </p>
            ),
            username_email_err: "",
          });
        } else {
          setResponseerr({
            usernameerr: "",
            emailerr: "",
            username_email_err: "Something went wrong. Try again!",
          });
        }
      });
  };
  return (
    <div className="signup_full">
      <div className="signup_left"></div>
      <form className="signupform" onSubmit={handleSubmit}>
        <h1 className="signup_heading">Hey welcome! Sign up here</h1>
        <div>
          <p>Username</p>
          <input
            type={"text"}
            placeholder="eg: blogger"
            name="username"
            value={user.username}
            onChange={handlechange}
            required
          />
          <p className="responseerr">{responseerr.usernameerr}</p>
        </div>
        <div>
          <p>Email</p>
          <input
            type={"email"}
            placeholder="eg: bloger@gmail.com"
            name="email"
            value={user.email}
            onChange={handlechange}
            required
          />
          <p className="responseerr">{responseerr.emailerr}</p>
        </div>
        <div>
          <p>Password</p>
          <input
            type={"password"}
            placeholder="eg: Blogstar@123"
            name="password"
            value={user.password}
            onChange={handlechange}
            required
          />
        </div>
        <div className="genderSelect">
          <p>Gender</p>
          <div className="genderSelectOptions">
            <img
              onClick={() => {
                setUser({ ...user, gender: "Male" });
              }}
              className={user.gender === "Male" ? "hgso1" : "gso1"}
              src="https://user-images.githubusercontent.com/105535366/226932863-2d06f73b-d25b-4606-be5b-8486d1bc7ffd.png"
              alt=""
            />
            <img
              onClick={() => {
                setUser({ ...user, gender: "Female" });
              }}
              className={user.gender === "Female" ? "hgso2" : "gso2"}
              src="https://user-images.githubusercontent.com/105535366/265462183-526db2c8-6786-425b-a250-ffcc39172e8b.png"
              alt=""
            />
          </div>
        </div>
        <p className="responseerr">{responseerr.username_email_err}</p>
        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default Signup;
