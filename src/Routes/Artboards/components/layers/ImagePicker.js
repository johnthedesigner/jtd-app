import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import imageLibrary from "./imageLibrary";

class ImagePicker extends React.Component {
  render() {
    // Don't show the picker if it's not toggled on
    if (!this.props.showImagePicker) return null;

    const addImageLayer = (e, imageId) => {
      this.props.addLayer("image", imageId);
      this.props.toggleImagePicker();
      e.stopPropagation();
    };

    const ImageThumbnail = props => {
      console.log(props);
      return (
        <div className="image-picker__thumbnail">
          <img
            src={props.url}
            onClick={e => addImageLayer(e, props.id)}
            alt={props.id}
          />
        </div>
      );
    };
    return (
      <div className="image-picker">
        {_.map(imageLibrary, image => {
          return <ImageThumbnail key={image.id} {...image} />;
        })}
      </div>
    );
  }
}

ImagePicker.propTypes = {
  addLayer: PropTypes.func.isRequired
};

export default ImagePicker;
