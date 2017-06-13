import React from 'react'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { flattenNavigationParamsProps } from './lib/navigationUtils'

import * as screens from './constants/screens'

import ConnectionScreen from './components/ConnectionScreen'
import BrowseSongsScreen from './components/BrowseSongsScreen'
import HomeScreen from './components/HomeScreen'
import SearchSongsScreen from './components/SearchSongsScreen'
import PlaylistScreen from './components/PlaylistScreen'

import configureStore from './store/configureStore'

const store = configureStore()

const AppNavigator = StackNavigator(
  {
    [screens.CONNECTION_SCREEN]: { screen: ConnectionScreen },
    [screens.MAIN_SCREEN_CONTAINER]: {
      screen: StackNavigator(
        {
          [screens.MAIN_SCREEN]: {
            screen: TabNavigator(
              {
                [screens.BROWSE_GROUPS_SCREEN]: { screen: HomeScreen },
                [screens.PLAYLIST_SCREEN]: { screen: flattenNavigationParamsProps(PlaylistScreen) },
              },
              {
                tabBarPosition: 'bottom',
                swipeEnabled: true,
                tabBarOptions: { scrollEnabled: true },
              },
            ),
          },
          [screens.BROWSE_SONGS_SCREEN]: {
            screen: flattenNavigationParamsProps(BrowseSongsScreen),
          },
          [screens.SEARCH_SONGS_SCREEN]: {
            screen: flattenNavigationParamsProps(SearchSongsScreen),
          },
        },
        { headerMode: 'none' },
      ),
    },
  },
  { headerMode: 'none' },
)

// onNavigationStateChange={null} desactivates the internal logger
// which makes a HUGE difference in performance.
export default () =>
  <Provider store={store}>
    <AppNavigator onNavigationStateChange={null} />
  </Provider>
