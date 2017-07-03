import React from 'react'

class EditorActionBar extends React.Component {
  constructor(props) {
    super(props)
    this.addRectangle = this.addRectangle.bind(this)
  }

  addRectangle = (e) => {
    e.target.blur()
    this.props.addLayer('rectangle', this.props.projectId)
    e.stopPropagation()
  }

  addText = (e) => {
    e.target.blur()
    this.props.addLayer('text', this.props.projectId)
    e.stopPropagation()
  }

  render() {
    return (
      <div className="editor-action-bar__wrapper">
        <button onClick={this.addRectangle}>Add Rectangle</button>
        <button onClick={this.addText}>Add Text</button>
      </div>
    )
  }
}

export default EditorActionBar