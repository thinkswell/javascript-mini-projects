import "./styles/blogtemplate.css";
import { Link, useParams } from "react-router-dom";
const Blogtemplate = (itemdata) => {
  const data = itemdata;
  const heading = "My blg post title";
  return (
    <Link id="vbtn_link" to={`/view/${data.id}`}>
      <div className="container-bt">
        <div id="blgimg">
          <img id="blog_image" src={data.image} />
        </div>
        <div className="content">
          <p className="author">
            <Link to={`/blogs/user/${data.author}`}>{data.author}</Link>
          </p>
          <div className="topdetails">
            <h2>{data.heading}</h2>
          </div>
          <div className="contenttext">
            {data.shortdescription.slice(0, 280)}...
          </div>
          <p className="date">{data.date.split("T")[0]}</p>
        </div>
      </div>
    </Link>
  );
};
export default Blogtemplate;
