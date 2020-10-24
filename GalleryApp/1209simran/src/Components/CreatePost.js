import React, { Component } from "react";

class Createpost extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const imageLink = event.target.elements.imageLink.value;
    const description = event.target.elements.description.value;
    const post = {
      id: Number(new Date()),
      description: description,
      imageLink: imageLink
    };
    if (description && imageLink) {
      this.props.addPicture(post.id, post.imageLink, post.description);
      this.props.onHistory.push("/");
    }
  }

  render() {
    return (
      <div className="add-post">
        <div className="form" onSubmit={this.handleSubmit}>
          <form className="add-form">
            <input name="imageLink" placeholder="Link" />
            <input name="description" placeholder="Description" />
            <button>Post</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Createpost;
