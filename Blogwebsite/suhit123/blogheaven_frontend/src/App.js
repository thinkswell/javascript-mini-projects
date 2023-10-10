import "./styles/App.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detailedcontent from "./Detailedcontent";
import Nav from "./nav";
import Addpost from "./addpost";
import Signup from "./signup";
import Login from "./login";
import Profile from "./profile";
import Loader from "./loader";
import Editpost from "./editpost";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view/:id" element={<Detailedcontent />} />
          <Route path="/blogs/user/:username" element={<Profile />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit/:id" element={<Editpost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
