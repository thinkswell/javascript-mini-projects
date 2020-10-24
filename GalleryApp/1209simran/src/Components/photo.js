import React, { Component } from "react";

class Photo extends Component {
  render() {
    const post = this.props.post;
    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <img
            src={post.imageLink}
            alt={post.description}
            className="grid-photo"
          />
          <div class="middle">
            <div class="text">{post.description}</div>
          </div>
        </div>
        <figcaption>
          <p>{post.description}</p>
          <div className="control-buttons">
            <button
              className="Remove"
              onClick={() => {
                this.props.history.push("/");
                this.props.removePicture(this.props.i);
              }}
            >
              <span>Remove</span>
            </button>
          </div>
        </figcaption>
      </figure>
    );
  }
}

export default Photo;
