import uuid from 'uuid'

export const newLayers = {
  rectangle: () => {
    return {
      id: uuid.v1(),
      type: 'rectangle',
      title: 'rectangle',
      adjustments: {
        fill: {
          backgroundColor: 'rgba(255,255,0,.5)'
        },
        dimensions: {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          scaleX: 1,
          scaleY: 1,
          rotation: 0
        }
      }
    }
  },
  text: () => {
    return {
      id: uuid.v1(),
      type: 'text',
      title: 'text',
      text: 'Enter new text.',
      adjustments: {
        type: {
          color: '#444444'
        },
        dimensions: {
          x: 0,
          y: 0,
          width: 200,
          height: 100,
          scaleX: 1,
          scaleY: 1,
          rotation: 0
        }
      }
    }
  }
}