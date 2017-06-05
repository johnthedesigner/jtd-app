const layerTypes = {
  draggable: 'draggable',
  image: 'image',
  group: 'group',
  rectangle: 'rectangle',
  text: 'text',
}

export const Project_1 = {
  id: 0,
  filename: 'project-one.jtd',
  title: 'Project One',
  artboards: [
    {
      id: 0,
      title: 'Artboard 0',
      width: 600,
      height: 400,
      layers: [0,1,2,3,4]
    }
  ],
  layers: [
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
      id: 4,
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
    }
  ]
}