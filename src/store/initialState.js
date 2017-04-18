const initialState = {
  Projects: {
    items: [
      {
        id: 'project_one',
        slug: 'project-one.jtd',
        title: 'Project One',
        artboards: [
          {
            id: 0,
            title: 'Artboard 1',
            width: 600,
            height: 400,
            layers: [
              {
                id: 0,
                type: 'rectangle',
                title: 'box 1',
                backgroundColor: '#FF0000',
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
              {
                id: 1,
                type: 'image',
                title: 'box 2',
                src: 'http://www.placehold.it/400x400/',
                dimensions: {
                  x: 300,
                  y: 100,
                  width: 100,
                  height: 100,
                  scaleX: 1,
                  scaleY: 1,
                  rotation: 0
                }
              },
              {
                id: 2,
                type: 'text',
                title: 'box 3',
                text: 'Lorem ipsum dolor sit amet',
                color: '#444444',
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
            ]
          },
          {
            id: 1,
            title: 'Artboard 2',
            width: 600,
            height: 400,
            layers: [
              {
                id: 0,
                type: 'rectangle',
                title: 'box 1',
                backgroundColor: '#FF0000',
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
              {
                id: 1,
                type: 'image',
                title: 'box 2',
                src: 'http://www.placehold.it/400x400/',
                dimensions: {
                  x: 300,
                  y: 100,
                  width: 100,
                  height: 100,
                  scaleX: 1,
                  scaleY: 1,
                  rotation: 0
                }
              },
              {
                id: 2,
                type: 'text',
                title: 'box 3',
                text: 'Lorem ipsum dolor sit amet',
                color: '#444444',
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
            ]
          }
        ]
      },
      {
        id: 'project_two',
        slug: 'project-two.jtd',
        title: 'Project Two',
        artboards: [
          {
            id: 0,
            title: 'Artboard 1',
            width: 800,
            height: 400,
            layers: [
              {
                id: 0,
                type: 'rectangle',
                title: 'box 1',
                backgroundColor: '#FF0000',
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
              {
                id: 1,
                type: 'image',
                title: 'box 2',
                src: 'http://www.placehold.it/400x400/',
                dimensions: {
                  x: 300,
                  y: 100,
                  width: 100,
                  height: 100,
                  scaleX: 1,
                  scaleY: 1,
                  rotation: 0
                }
              },
              {
                id: 2,
                type: 'text',
                title: 'box 3',
                text: 'Lorem ipsum dolor sit amet',
                color: '#444444',
                dimensions: {
                  x: 500,
                  y: 300,
                  width: 200,
                  height: 100,
                  scaleX: 1,
                  scaleY: 1,
                  rotation: 0
                }
              }
            ]
          }
        ]
      }
    ],
    selections: {
      projectId: 'project_one',
      artboardId: 0,
      layerId: null
    }
  }
}

export default initialState