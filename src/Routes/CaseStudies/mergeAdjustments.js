import _ from 'lodash'

var getAllPaths = (obj, stack = []) => {
  return _.reduce(obj, (paths, value, key) => {
    return paths.concat(
      _.isObject(value) ?
        getAllPaths(value, stack.concat(key))
      :
        [stack.concat(key)]
    )
  }, [])
}

var getValueAtPath = (path, obj) => (
  _.isObject(obj) ?
    getValueAtPath(_.tail(path), obj[_.head(path)])
  :
    obj
)

var valueExistsAtPath = (path, obj) => {
  if (_.isEmpty(path)) {
    return true
  } else if (_.isObject(obj)) {
    return valueExistsAtPath(_.tail(path), obj[_.head(path)])
  } else {
    return false
  }
}

var buildFromPath = (path, val) => (
  _.isEmpty(path) ?
    val
  :
    { [_.head(path)]: buildFromPath(_.tail(path), val) }
)

export const mergeAdjustments = (array) => {
  if (array.length > 0) {
    const first = _.head(array)

    const commonPaths = getAllPaths(first.adjustments).filter(path => {
      const value = getValueAtPath(path, first.adjustments)

      return _.tail(array).every(obj => {
        return valueExistsAtPath(path, obj.adjustments) && getValueAtPath(path, obj.adjustments) === value
      })
    })

    return _.reduce(commonPaths, (commons, path) => {
      _.merge(commons, buildFromPath(path, getValueAtPath(path, _.head(array))))
      return commons
    }, {})
  }
}
