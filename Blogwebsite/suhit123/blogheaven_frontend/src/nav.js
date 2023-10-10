import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/nav.css";
const Nav = () => {
  const [usercheck, setUsercheck] = useState(false);
  const [userportfolio, setUserportfolio] = useState("");
  const [portfoliodisplay, setPortfoliodisplay] = useState("none");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userLoad, setUserLoad] = useState(false);
  const [cookie, setCookie] = useState({
    cname: "",
    cvalue: "",
  });
  useEffect(() => {
    if (document.cookie) {
      const cookie = document.cookie.split("=");
      const cname = cookie[0];
      const cvalue = cookie[1];
      setCookie({ cname: cname, cvalue: cvalue });
      if (cookie) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/userdetails`, { token: cvalue })
          .then((res) => {
            setUsercheck(true);
            const userdata = res.data;
            setUserportfolio(userdata);
            setPortfoliodisplay("block");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);
  const logout = (e) => {
    console.log(cookie.cvalue);
    setUsercheck(false);
    setUserportfolio("");
    setPortfoliodisplay("none");
    document.cookie = `${cookie.cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      setUserLoad(true);
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/users/search/${e.target.value}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setUserLoad(false);
        });
    } else {
      setUsers([]);
    }
  };

  return (
    <div className="nav">
      <Link to="/" id="logo">
        <h2>BLOGHEAVEN</h2>
      </Link>
      <div className="links">
        <form className="search">
          <div className="searchBar">
            <input
              type="text"
              placeholder="search user"
              name="search"
              value={search}
              onChange={handleSearch}
              autoComplete="off"
            />
            <div className="searchBarResults">
              {users.map((item) => {
                return (
                  <a
                    className="searchBarResultLink"
                    href={`/blogs/user/${item.username}`}
                  >
                    <div className="searchBarResult">
                      {item.gender === "Female" ? (
                        <img
                          src="https://user-images.githubusercontent.com/105535366/265462183-526db2c8-6786-425b-a250-ffcc39172e8b.png"
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://user-images.githubusercontent.com/105535366/226932863-2d06f73b-d25b-4606-be5b-8486d1bc7ffd.png"
                          alt=""
                        />
                      )}
                      <p>{item.username}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </form>
        <Link id="addpost_link" to={usercheck ? "/addpost" : "/login"}>
          <h3>Add Blog</h3>
        </Link>
        <Link
          id="portfolio_link"
          to={`/blogs/user/${userportfolio.username}`}
          style={{ display: `${portfoliodisplay}` }}
        >
          <div id="portfolio_link_grid">
            <img
              id="profilename_sideimg"
              src="https://www.pngall.com/wp-content/uploads/5/Profile.png"
              alt="profile_img"
            />
            <p>{userportfolio.username}</p>
          </div>
        </Link>
        {usercheck ? (
          <button>
            <Link id="signup_link" to={"/signup"} onClick={logout}>
              Logout
            </Link>
          </button>
        ) : (
          <button>
            <Link id="signup_link" to={"/signup"}>
              SingUp
            </Link>{" "}
            /{" "}
            <Link id="signup_link" to={"/login"}>
              Login
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};
export default Nav;
