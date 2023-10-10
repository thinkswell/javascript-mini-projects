import Blogtemplate from "./blogtemplate";
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/home.css";
import Loader from "./loader";
import Nav from "./nav";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dataload, setDataLoad] = useState(false);
  const fetchData = (e) => {
    e.preventDefault();
    setDataLoad(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/blogs`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDataLoad(false);
      });
  };
  useEffect(() => {
    setDataLoad(true);
    console.log(process.env.REACT_APP_BASE_URL)
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/blogs`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDataLoad(false);
      });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  const categoryData = (e) => {
    e.preventDefault();
    setDataLoad(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/blogs/category/${e.target.name}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDataLoad(false);
      });
  };
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    console.log(e.target.value.length);
    const len = e.target.value.length;
    if (len > 0) {
      setDataLoad(true);
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/blogs/search/${e.target.value}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setDataLoad(false);
        });
    } else {
      setDataLoad(true);
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/blogs`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setDataLoad(false);
        });
    }
  };
  return (
    <>
      {loading ? <Loader /> : <></>}
      <Nav />
      <div className="homepage">
        <div className="searchgradient">
          <h1>BLOGHEAVEN.</h1>
          <form className="search_under_gradient">
            <input
              type="text"
              placeholder="search"
              name="search"
              value={search}
              onChange={handleSearch}
              autoComplete="off"
            />
          </form>
        </div>
        <ul className="categories">
          <li>
            <button onClick={fetchData}>All</button>
          </li>
          <li>
            <button onClick={categoryData} name="technology">
              Technology
            </button>
          </li>
          <li>
            <button onClick={categoryData} name="food">
              Food
            </button>
          </li>
          <li>
            <button onClick={categoryData} name="travel">
              Travel
            </button>
          </li>
          <li>
            <button onClick={categoryData} name="nature">
              Nature
            </button>
          </li>
          <li>
            <button onClick={categoryData} name="social issues">
              Social Issues
            </button>
          </li>
          <li>
            <button onClick={categoryData} name="others">
              Others
            </button>
          </li>
        </ul>
      </div>
      <div className="blocks">
        {dataload ? (
          <div className="dataLoader"></div>
        ) : data.length === 0 ? (
          <div className="not_found_img">
            <img
              src="https://i.pinimg.com/originals/2b/74/e0/2b74e0fa5496c026a78d04b3209238de.jpg"
              alt=""
            />
            <h1>404 | No data Found!</h1>
          </div>
        ) : (
          data.map((item, key) => {
            console.log(item.image);
            return (
              <Blogtemplate
                id={item._id}
                image={item.image}
                heading={item.heading}
                author={item.author}
                catogary={item.catogary}
                comments={item.comments}
                content={item.smalldescription}
                detailedcontent={item.content}
                date={item.date}
                shortdescription={item.shortdescription}
              />
            );
          })
        )}
      </div>
    </>
  );
};
export default Home;
