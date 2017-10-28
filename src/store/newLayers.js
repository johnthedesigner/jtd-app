import uuid from 'uuid'

export const newLayers = {
  ellipse: () => {
    return {
      id: uuid.v1(),
      type: 'ellipse',
      title: 'ellipse',
      adjustments: {
        fill: {
          backgroundColor: 'rgba(0,255,255,.75)'
        },
        dimensions: {
          x: 200,
          y: 450,
          width: 200,
          height: 200,
          scaleX: 1,
          scaleY: 1,
          rotation: 0
        }
      }
    }
  },
  image: () => {
    return {
      id: uuid.v1(),
      type: 'image',
      title: 'image',
      adjustments: {
        image: {
          src: 'http://www.placehold.it/400x400/'
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