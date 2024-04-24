import React from "react";
import "./styles.css";

interface Props {
  src: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: string;
  height?: string;
  transformOrigin?: string;
  hoverScale?: string;
  hoverX?: string;
  hoverY?: string;
}

class FortniteButtonImage extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img
        style={{
          position: "absolute",
          // maxWidth: "max-content",
          top: this.props.top || "3%",
          right: this.props.right || 0,
          bottom: this.props.bottom || 0,
          left: this.props.left,
          width: this.props.width || "100%",
          height: this.props.height,
          transformOrigin: this.props.transformOrigin,
          transition: "transform 150ms linear",
        }}
        src={this.props.src}
      />
    );
  }
}

export default FortniteButtonImage;
