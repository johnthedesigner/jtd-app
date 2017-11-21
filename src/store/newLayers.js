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
        }
      },
    }
  },
  text: () => {
    return {
      type: 'text',
      title: 'text',
      text: 'Lorem ipsum dolor sit amet, lorem ipsum. Dolor sit amet lorem, ipsum dolor sit.',
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
          fontSize: 24,
          align: 'left'
        }
      }
    }
  }
}
