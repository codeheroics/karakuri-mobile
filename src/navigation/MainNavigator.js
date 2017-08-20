import React from 'react'
import { connect } from 'react-redux'
import { DrawerNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation'

import * as screens from '../constants/screens'
import { flattenNavigationParamsProps } from '../lib/navigationUtils'
import BrowseGroupsScreen from '../components/BrowseGroupsScreen'
import BrowseSongsScreen from '../components/BrowseSongsScreen'
import SearchSongsScreen from '../components/SearchSongsScreen'
import PlaylistScreen from '../components/PlaylistScreen'
import DrawerMenu from '../components/DrawerMenu'

export const routesInDrawer = [
  { id: screens.BROWSE_GROUPS_SCREEN, screen: BrowseGroupsScreen, drawerTitle: 'Browse Groups' },
  { id: screens.PLAYLIST_SCREEN, screen: PlaylistScreen, drawerTitle: 'My Playlist' },
  { id: screens.SEARCH_SONGS_SCREEN, screen: SearchSongsScreen, drawerTitle: 'Search Songs' },
]

const otherStackNavigatorRoutes = {
  [screens.BROWSE_SONGS_SCREEN]: {
    screen: flattenNavigationParamsProps(BrowseSongsScreen),
  },
}

export const MainNavigator = DrawerNavigator(
  {
    [screens.MAIN_SCREEN_CONTAINER]: {
      screen: StackNavigator(
        {
          ...routesInDrawer.reduce(
            (prev, route) => ({ ...prev, [route.id]: { screen: route.screen } }),
            {},
          ),
          ...otherStackNavigatorRoutes,
        },
        { headerMode: 'none' },
      ),
    },
  },
  {
    contentComponent: DrawerMenu,
  },
)

export const ConnectedMainNavigator = connect(({ navigation }) => ({
  navigation,
}))(({ navigation, dispatch }) =>
  <MainNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: navigation,
    })}
  />,
)
