export const newLayers = {
  rectangle: () => {
    return {
      id: Math.floor(1000 * Math.random()),
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
  }
}