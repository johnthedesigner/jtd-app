export const scaleDimension = (dimension, scaleFactor) => {
  return dimension * scaleFactor
}

export const unscaleDimension = (dimension, scaleFactor) => {
  return Math.round(Math.round((dimension / scaleFactor) / 10) * 10)
}

export const scaleAllDimensions = (dimensions, scaleFactor, scaleIn) => {
  let { x, y, width, height } = dimensions
  function scale(dimension) {
    if (scaleIn) {
      return scaleDimension(dimension,scaleFactor)
    } else {
      return unscaleDimension(dimension,scaleFactor)
    }
  }
  return {
    x: scale(x),
    y: scale(y),
    width: scale(width),
    height: scale(height),
  }
}