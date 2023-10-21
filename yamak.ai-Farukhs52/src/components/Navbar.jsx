import React from "react";
import CachedIcon from '@mui/icons-material/Cached';
const Navbar = () => {
  return (
    <div>

      <nav className="navbar col-bottom navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid gx-0 ">
          <div className="navbar-brand flex"><h1 className="firstHeading">Yamak</h1><h1 className="secondHeading">.ai</h1></div>

          <div className="col-lg-7 ms-auto col-12" id="navbarSupportedContent">
            <ul className="navbar-nav  mt-2 mt-lg-0">
              <li className="nav-item "><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Marketing</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Social Media</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Sales Copy</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Blogs</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Others</a></li>

            </ul>
          </div>
          <div className="flex nav-item ms-5 mt-3">
            <li className="refreshIcon"><a href="#!"><CachedIcon /></a></li>

            <li className="imgDropdown"  >
              <img src="data:image/jpeg;base64,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"
                alt="profile" width="40" height="40" className="rounded-circle  me-2 dropdown-toggle"
                type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
              <ul class="dropdown-menu dropdown-menu-end " >
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Project</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Log out</a></li>
              </ul>
            </li>
          </div>
        </div>
      </nav>
    </div>

  );

}

export default Navbar;