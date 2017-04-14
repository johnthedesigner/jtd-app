import { consoleGroup } from './utils'
import {
  FETCHING_FILE,
} from './constants'

export function fetchingFile() {
  return {
    type: FETCHING_FILE
  }
}

export function fetchAndParseFile(unparsedData, headerRow) {
  return dispatch => {
    dispatch(fetchingFile())
    let json = CSV.parse(unparsedData, {
      header: headerRow,
      dynamicTyping: true
    })
    if (json.errors.length > 0) dispatch(fileParseError(json.errors))
    let dataset = buildDataset(json.data)
    dispatch(storeFileData(dataset))
  }
}

export function updateSelectionIndices(selectedIndexes, selectedRows) {
  return {
    type: UPDATE_SELECTION_INDICES,
    selectedIndexes,
    selectedRows
  }
}

export function updateSort(sortColumn, sortDirection) {
  return {
    type: UPDATE_SORT,
    sortColumn,
    sortDirection
  }
}

export function updateFilters(filters) {
  return {
    type: UPDATE_FILTER,
    filters
  }
}
