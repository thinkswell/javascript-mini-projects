import { Fragment } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/Home.css";

const Home = () => {
  return (
    <Fragment>
      <div className="home-container">
        <h1>Welcome to Thinks Well Javascript Projects</h1>
        <p>Explore the projects and learn more about the team</p>
        {/* Button to navigate to /projects */}
        <Link to="/projects" className="see-projects-button">
          See Projects
        </Link>
      </div>
    </Fragment>
  );
};

export default Home;
