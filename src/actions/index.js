import { ToastAndroid } from 'react-native'

import * as types from '../constants/actionTypes'
import { handleWebsocketsConnection } from '../lib/websockets'

export const connectToServer = ({ username, hostname, port }) => (dispatch, getState) => {
  dispatch({ type: types.CONNECTION_REQUEST })

  const url = `http://${hostname}:${port}`
  return fetch(url.concat('/contents'))
    .then(response => response.json())
    .then(contents => {
      dispatch({
        type: types.CONNECTION_SUCCESS,
        username,
        hostname,
        port,
        url,
      })
      dispatch({
        type: types.CONTENTS_LOADED,
        contents,
      })
      handleWebsocketsConnection(dispatch, getState)
    })
    .catch(err => {
      dispatch({
        type: types.CONNECTION_FAILURE,
        errorMessage: err && err.toString(),
      })
      return Promise.reject() // To get the original promise to fail. FIXME?
    })
}

export const selectDirectory = directoryName => ({
  type: types.SELECT_DIRECTORY,
  directoryName,
})
export const selectGroup = groupName => ({
  type: types.SELECT_GROUP,
  groupName,
})

export const addToPlaylist = id => (dispatch, getState) => {
  const { url, username } = getState().connection

  return fetch(`${url}/request`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ id, username }),
  })
    .then(response => response.json())
    .then(({ message }) => {
      dispatch({ type: types.PLAYLIST_ADDITION_SUCCESS, id })
      ToastAndroid.show(message, ToastAndroid.LONG) // Could be handled in a middleware
    })
    .catch(err => {
      dispatch({ type: types.PLAYLIST_ADDITION_FAILURE })
      ToastAndroid.show(err.toString(), ToastAndroid.LONG) // Could be handled in a middleware
    })
}

export const removeFromPlaylist = id => (dispatch, getState) => {
  const { url, username } = getState().connection

  fetch(`${url}/remove`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ id, username }),
  })
    .then(response => response.json())
    .then(({ message }) => {
      ToastAndroid.show(message, ToastAndroid.SHORT)
    })
    .catch(err => {
      ToastAndroid.show(err.toString(), ToastAndroid.LONG)
    })
}

export const updateLocalPlaylist = ({ playingContent, playlistContents }) => ({
  type: types.PLAYLIST_UPDATE,
  playingContent,
  playlistContents,
})

export const randomizePlaylist = () => (dispatch, getState) => {
  const { url, username } = getState().connection
  fetch(`${url}/randomize`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ username }),
  })
    .then(response => response.json())
    .then(({ message }) => ToastAndroid.show(message, ToastAndroid.SHORT))
    .catch(err => ToastAndroid.show(err.toString(), ToastAndroid.SHORT))
}

export const toggleFavorite = contentId => ({ type: types.TOGGLE_FAVORITE, contentId })
