export const layerTypes = {
  draggable: 'draggable',
  image: 'image',
  group: 'group',
  rectangle: 'rectangle',
  text: 'text',
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
    title: 'image 1',
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
    title: 'text 1',
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
    title: 'Layer Group',
    layers: [1,2,4]
  },
  {
    id: 4,
    type: layerTypes.group,
    title: 'Layer Group',
    layers: [5,6]
  },
  {
    id: 5,
    type: layerTypes.rectangle,
    title: 'box 2',
    adjustments: {
      fill: {
        backgroundColor: 'rgba(255,0,255,.5)'
      },
      dimensions: {
        x: 300,
        y: 250,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      }
    },
  },
  {
    id: 6,
    type: layerTypes.image,
    title: 'image 2',
    adjustments: {
      image: {
        src: 'http://www.placehold.it/400x400/'
      },
      dimensions: {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      }
    }
  },
  {
    id: 7,
    type: layerTypes.dragRectangle,
    title: 'draggable',
    adjustments: {
      fill: {
        backgroundColor: 'rgba(255,0,255,.5)'
      },
      dimensions: {
        x: 300,
        y: 250,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      }
    }
  }
]
