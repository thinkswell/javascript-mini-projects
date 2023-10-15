import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blogtemplate from "./blogtemplate";
import "./styles/profile.css";
import Nav from "./nav";
import Blogtemplateprofile from "./blogtemplateprofile";
const Profile = () => {
  const { username } = useParams();
  const [loader, setLoader] = useState(true);
  const [user_data, setUser_data] = useState([]);
  const [userSessionData, setUserSessionData] = useState({
    id: "",
    username: "",
    email: "",
  });
  const [user, setUser] = useState({});
  const fetch = async () => {
    setLoader(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/blogs/user/${username}`)
      .then((res) => {
        setUser(res.data[0]);
        setUser_data(res.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
    await setTimeout(() => {
      setLoader(false);
    }, 500);
  };
  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    if (document.cookie) {
      const cookie = document.cookie.split("=");
      const cname = cookie[0];
      const cvalue = cookie[1];
      if (cookie) {
        setLoader(true);
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/userdetails`, { token: cvalue })
          .then((res) => {
            const userdata = res.data;
            setUserSessionData(userdata);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);
  const handleDelete = async (blogId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/blogs/${blogId}`)
      .then(() => {
        console.log("Deleted!");
        fetch();
      })
      .catch(() => {
        console.log("Something gone wrong");
      });
  };
  return (
    <>
      <Nav />
      {loader ? (
        <div className="dataLoader"></div>
      ) : (
        <>
          <div className="Profile_container">
            <div className="user_block">
              <div className="profileCpic"></div>
              <div className="user_png">
                {user.gender === "Female" ? (
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
              </div>
              <div className="user_details">
                <h1>
                  {user.username === "" ? "User Not Found" : user.username}
                </h1>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <h3 className="profileBlogHeading">Blogs</h3>
          <div className="blocks">
            {user_data.length === 0 ? (
              <div className="not_found_img">
                <img
                  src="https://i.pinimg.com/originals/2b/74/e0/2b74e0fa5496c026a78d04b3209238de.jpg"
                  alt=""
                />
                <h1>404 | No data Found!</h1>
              </div>
            ) : (
              user_data.map((item) => {
                return (
                  <Blogtemplateprofile
                    itemdata={item}
                    editOptions={username === userSessionData.username}
                    onDelete={handleDelete}
                  />
                );
              })
            )}
          </div>
        </>
      )}
    </>
  );
};
export default Profile;
