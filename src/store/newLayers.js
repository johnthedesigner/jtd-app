export const newLayers = {
  ellipse: () => {
    return {
      type: 'ellipse',
      title: 'ellipse',
      order: 0,
      dimensions: {
        x: 450,
        y: 450,
        width: 100,
        height: 100,
        rotation: 0
      },
      adjustments: {
        fill: {
          type: 'color',
          color: 'rgba(11,231,183,1)'
        },
        stroke: {
          color: 'rgba(40,40,40,1)',
          width: 1
        }
      },
    }
  },
  image: () => {
    return {
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
      type: 'rectangle',
      title: 'rectangle',
      order: 0,
      dimensions: {
        x: 450,
        y: 450,
        width: 100,
        height: 100,
        rotation: 0
      },
      adjustments: {
        fill: {
          type: 'color',
          color: 'rgba(11,231,183,1)'
        },
        stroke: {
          color: 'rgba(40,40,40,1)',
          width: 1
        }
      },
    }
  },
  text: () => {
    return {
      type: 'text',
      title: 'text',
      text: 'Add your own text',
      order: 0,
      dimensions: {
        x: 400,
        y: 450,
        width: 200,
        height: 100,
        rotation: 0
      },
      adjustments: {
        text: {
          textColor: '#444444',
          fontFamily: 'sans',
          fontSize: 60,
          align: 'right'
        }
      }
    }
  }
}
