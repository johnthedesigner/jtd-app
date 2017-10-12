import _ from 'lodash'

// Files Reducer
export default function History(state = {}, a) {
  let newState = _.cloneDeep(state)
  a.timestamp = Date.now()
  if (!newState.actions) {
    a.delay = 0
  } else {
    a.delay = a.timestamp - _.last(newState.actions).timestamp
  }
  newState.actions = _.union(newState.actions,[a])
  return newState
  // switch (a.type) {
  //   case UPDATE_TEXT:
  //     consoleGroup('UPDATE_TEXT',[a])
  //     let textEditedLayers = _.cloneDeep(state.Layers)
  //     textEditedLayers[a.layerId].text = a.text
  //     return Object.assign({},state,{ Layers: textEditedLayers })
  //
  //   default:
  //     // consoleGroup('File Reducer Default',[action])
  //     return state
  // }
}
