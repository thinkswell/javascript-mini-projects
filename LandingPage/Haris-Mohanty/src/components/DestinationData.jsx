import React, { Component } from "react";
import "./Destination.css";

class DestinationData extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="des-text">
          <h3 className="mt-3">{this.props.heading}</h3>
          <p className="font-lato ms-3">{this.props.text}</p>
          <button className="d-flex float-end">{this.props.button}</button>
        </div>
        <div className="image">
          <img src={this.props.img1} alt="Img 1" />
          <img src={this.props.img2} alt="Img 2" />
        </div>
      </div>
    );
  }
}

export default DestinationData;
