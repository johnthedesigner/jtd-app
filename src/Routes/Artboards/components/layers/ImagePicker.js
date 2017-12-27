import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import imageLibrary from "./imageLibrary";

class ImagePicker extends React.Component {
  render() {
    // Don't show the picker if it's not toggled on
    if (!this.props.showImagePicker) return null;

    const addImageLayer = (e, image) => {
      this.props.toggleImagePicker();
      this.props.addLayer("image", image);
      e.stopPropagation();
    };

    const ImageThumbnail = image => {
      return (
        <div className="image-picker__thumbnail">
          <img
            src={image.image.url}
            onClick={e => addImageLayer(e, image.image)}
            alt={image.image.id}
          />
        </div>
      );
    };
    return (
      <div className="image-picker">
        <div className="image-picker__body">
          {_.map(imageLibrary, image => {
            return <ImageThumbnail key={image.id} image={image} />;
          })}
        </div>
        <div className="image-picker__footer">
          <button
            className="image-picker__cancel-button"
            onClick={this.props.toggleImagePicker}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

ImagePicker.propTypes = {
  addLayer: PropTypes.func.isRequired
};

export default ImagePicker;
