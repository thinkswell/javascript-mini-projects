import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/detailedcontent.css";
import Nav from "./nav";
const Detailedcontent = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    comments: [],
  });
  const [userdata, setUserdata] = useState({ username: "", email: "" });
  const [editauth, setEditauth] = useState("none");
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/blogs/${id}`)
      .then((res) => {
        setData(res.data);
        if (document.cookie) {
          const cookie = document.cookie.split("=");
          const cname = cookie[0];
          const cvalue = cookie[1];
          axios
            .post(`${process.env.REACT_APP_BASE_URL}/userdetails`, { token: cvalue })
            .then((res) => {
              const userdata = res.data;
              console.log(res.data);
              setUserdata(userdata);
              if (userdata.username === data.author) {
                setEditauth("block");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [commentSection, setCommentSection] = useState(true);
  const [commentForm, setCommentForm] = useState({
    name: "",
    comment: "",
  });
  const handlechange = (e) => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
    console.log(commentForm);
  };
  const userSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/blogs/comment/${id}`, commentForm)
      .then((res) => {
        setCommentForm({ name: "", comment: "" });
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Nav />
      <div className="container_dc">
        <div id="blg_detailed_img">
          <img id="blog_detailed_image" src={data.image} />
          <div className="blog_detailed_image_upper">
            <h2 id="headsing_dc">{data.heading}</h2>
            <div className="below_header">
              <div className="details_dc">
                <p>By: {data.author}</p>
                <p>Catogary: {data.catogary}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="contentDetailed"
        ></div>
        <div className="commentSection">
          <h3>Comments</h3>
          <button
            className="addComment"
            onClick={(e) => {
              e.preventDefault();
              setCommentSection(true);
            }}
          >
            Add a comment
          </button>
          {commentSection ? (
            <form className="commentForm" onSubmit={userSubmit}>
              <p>Name :</p>
              <input
                type="text"
                name="name"
                value={commentForm.name}
                onChange={handlechange}
                placeholder="eg. suhit"
                required
              />
              <p>comment :</p>
              <textarea
                type="text"
                name="comment"
                value={commentForm.comment}
                onChange={handlechange}
                placeholder="comment here"
                required
              />
              <div className="operationComment">
                <button className="oc1">Submit</button>
                <button
                  className="oc2"
                  onClick={(e) => {
                    e.preventDefault();
                    setCommentSection(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          ) : (
            <></>
          )}
          {data.comments.length === 0 ? (
            <p>No comments</p>
          ) : (
            data.comments.map((item) => {
              return (
                <div className="comment">
                  <p>{item.user}</p>
                  <p>{item.comment}</p>
                  <p>{item.date.split("T")[0]}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
export default Detailedcontent;
