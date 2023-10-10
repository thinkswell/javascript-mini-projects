import "./styles/blogtemplate.css";
import { Link, useParams } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
const Blogtemplateprofile = ({ itemdata, editOptions, onDelete }) => {
  const data = itemdata;
  return (
    <Link id="vbtn_link" to={`/view/${data._id}`}>
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
        {editOptions ? (
          <div className="editingOptions">
            <Link to={`/edit/${data._id}`}>
              <button className="eo1">
                <i className="fa fa-edit"></i> Edit
              </button>
            </Link>
            <button
              className="eo2"
              onClick={(e) => {
                console.log(data);
                e.preventDefault();
                onDelete(data._id);
              }}
            >
              <i className="fa fa-trash"></i> Delete
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
};
export default Blogtemplateprofile;
