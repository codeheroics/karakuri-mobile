import { CONTENTS_LOADED, SELECT_DIRECTORY, SELECT_GROUP } from '../constants/actionTypes'

const initialState = {
  allContents: [],
  directoryName: '',
  groupName: '',
}

export default function contents(state = initialState, action) {
  switch (action.type) {
    case CONTENTS_LOADED: {
      return {
        ...state,
        allContents: action.contents,
      }
    }

    case SELECT_DIRECTORY:
      return {
        ...state,
        directoryName: action.directoryName,
      }

    case SELECT_GROUP:
      return {
        ...state,
        groupName: action.groupName,
      }

    default:
      return state
  }
}
