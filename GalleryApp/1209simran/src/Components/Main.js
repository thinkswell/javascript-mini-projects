import React, { Component } from "react";
import { Link } from "react-router-dom";
import PhotoWall from "./PhotoAdder";
import AddPost from "./CreatePost";
import { Route, Switch } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <h1 className="font-face">
          <Link to="/">Photo Gallery</Link>
        </h1>
        <Switch>
          <Route exact path="/" render={() => <PhotoWall {...this.props} />} />
          <Route
            path="/create"
            render={({ history }) => (
              <AddPost {...this.props} onHistory={history} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
