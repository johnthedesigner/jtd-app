export const newLayers = {
  ellipse: () => {
    return {
      type: "ellipse",
      title: "ellipse",
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
          type: "color",
          color: "rgba(11,231,183,1)"
        },
        stroke: {
          color: "rgba(0,0,0)",
          width: 0
        }
      }
    };
  },
  image: () => {
    return {
      type: "image",
      title: "image",
      adjustments: {
        image: {
          src: "http://www.placehold.it/400x400/"
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
    };
  },
  rectangle: () => {
    return {
      type: "rectangle",
      title: "rectangle",
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
          type: "gradient",
          gradient: {
            start: "rgba(11,231,183,1)",
            end: "rgba(11,231,183,1)",
            angle: 0
          }
        },
        stroke: {
          color: "rgba(0,0,0)",
          width: 0
        }
      }
    };
  },
  text: () => {
    return {
      type: "text",
      title: "text",
      text: "Add your own text",
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
          align: "left",
          fontFamily: "sans",
          fontSize: 24,
          fontWeight: 300,
          italic: false,
          textColor: "rgba(0,0,0)",
          underline: false
        }
      }
    };
  }
};
