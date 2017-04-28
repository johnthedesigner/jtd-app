export const layerTypes = {
  image: 'image',
  group: 'group',
  rectangle: 'rectangle',
  text: 'text'
}

export const Layers = [
  {
    id: 0,
    type: layerTypes.rectangle,
    title: 'box 1',
    adjustments: {
      fill: {
        backgroundColor: 'rgba(255,255,0,.5)'
      },
      dimensions: {
        x: 100,
        y: 200,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      }
    },
  },
  {
    id: 1,
    type: layerTypes.image,
    title: 'box 2',
    adjustments: {
      image: {
        src: 'http://www.placehold.it/400x400/'
      },
      dimensions: {
        x: 300,
        y: 100,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      }
    }
  },
  {
    id: 2,
    type: layerTypes.text,
    title: 'box 3',
    text: 'Lorem ipsum dolor sit amet',
    adjustments: {
      type: {
        color: '#444444'
      },
      dimensions: {
        x: 350,
        y: 300,
        width: 200,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      }
    }
  },
  {
    id: 3,
    type: layerTypes.group,
    layers: [1,2]
  }
]
