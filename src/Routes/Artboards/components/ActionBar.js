import PropTypes from 'prop-types'
import React from 'react'

class ActionBar extends React.Component {
  constructor(props) {
    super(props)
    this.addArtboard = this.addArtboard.bind(this)
    this.addImage = this.addImage.bind(this)
    this.addRectangle = this.addRectangle.bind(this)
    this.addText = this.addText.bind(this)
  }

  addArtboard = (e) => {
    e.target.blur()
    this.props.addArtboard()// Not specifying dimensions for default size
    e.stopPropagation()
  }

  addImage = (e) => {
    e.target.blur()
    this.props.addLayer('image')
    e.stopPropagation()
  }

  addRectangle = (e) => {
    e.target.blur()
    this.props.addLayer('rectangle')
    e.stopPropagation()
  }

  addText = (e) => {
    e.target.blur()
    this.props.addLayer('text')
    e.stopPropagation()
  }

  render() {
    return (
      <div className="editor-action-bar__wrapper">
        <button onClick={this.addArtboard}>Add Artboard</button>
        |
        <button onClick={this.addImage}>Add Image</button>
        <button onClick={this.addRectangle}>Add Rectangle</button>
        <button onClick={this.addText}>Add Text</button>
      </div>
    )
  }
}

ActionBar.propTypes = {
  addArtboard: PropTypes.func.isRequired,
  addLayer: PropTypes.func.isRequired,
}

export default ActionBar