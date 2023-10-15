import React, { useEffect, useState } from "react";
import "./styles/addpost.css";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import image from "./images/image1.jpg";
const Addpost = () => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [userD, setUserD] = useState("y");
  const [formData, setFormData] = useState({
    heading: "",
    image: "",
    author: userD,
    catogary: "",
    shortdescription: "",
  });
  const [tempcontent, setTempContent] = useState("");
  useEffect(() => {
    console.log(document.cookie);
    if (document.cookie) {
      const cookie = document.cookie.split("=");
      const cname = cookie[0];
      const cvalue = cookie[1];
      if (cookie) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/userdetails`, { token: cvalue })
          .then((res) => {
            const userdata = res.data;
            setUserD(userdata.username);
            console.log(userdata);
            console.log(userD);
            setFormData({ ...formData, author: userD });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [userD]);
  useEffect(() => {
    const checkauth = document.cookie.slice("=")[1];
    if (!checkauth) {
      document.location.href = "/signup";
    }
  }, []);
  const handleChange = async (e) => {
    await setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);
    console.log(formData);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/blogs/add`, {
        ...formData,
        content: tempcontent,
      })
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log("error");
      })
      .finally(() => {
        setSubmitLoader(false);
      });
    document.location.href = "/";
  };

  return (
    <div className="entire_addpage">
      <div className="addpage_left">
        <img src={image} />
      </div>
      <form className="addblogForm" onSubmit={handleSubmit}>
        <div className="entire_fields">
          <div className="details_field">
            <div>
              <p>Blog title</p>
              <input
                type="text"
                name="heading"
                placeholder="Add a title"
                value={formData.heading}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Catogary</p>
              <select
                name="catogary"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="nature">Nature</option>
                <option value="social issues">Social Issues</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <p>Add image</p>
              <input
                type="text"
                name="image"
                placeholder="Paste image link"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <p className="description">Description</p>
          <textarea
            placeholder="Description goes here"
            name="shortdescription"
            value={formData.shortdescription}
            onChange={handleChange}
            required
          />
          <div className="context_field">
            <ReactQuill
              className="reactquill"
              theme="snow"
              value={tempcontent}
              onChange={setTempContent}
            />
          </div>
        </div>
        <button type="submit" className="editsubmit">
          Submit
          {submitLoader ? <div className="databuttonLoader"></div> : <></>}
        </button>
      </form>
    </div>
  );
};

export default Addpost;
