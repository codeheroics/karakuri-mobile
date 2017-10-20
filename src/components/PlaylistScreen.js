import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import Button from 'apsl-react-native-button'

import { randomizePlaylist } from '../actions'
import { getMyPlaylistContents } from '../selectors/contents'

import ContentsList from './ContentsList'
import { provideGoToContentScreen } from './goToContentScreenHOC'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    flex: 1,
  },
  listContainer: {
    flex: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#FFF',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
})

export class PlaylistScreen extends PureComponent {
  static propTypes = {
    contents: PropTypes.array,
    goToContentScreen: PropTypes.func.isRequired,
    randomizePlaylist: PropTypes.func,
  }

  static defaultProps = { contents: [], randomizePlaylist: () => {} }

  render() {
    const { contents } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ContentsList
            contents={contents}
            onSelect={this.props.goToContentScreen}
            showAddToPlaylist={false}
            showToggleFavorites={false}
            title="My Playlist"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.props.randomizePlaylist}
            style={styles.button}
            textStyle={styles.buttonText}
          >
            Randomize
          </Button>
        </View>
      </View>
    )
  }
}

export default connect(state => ({ contents: getMyPlaylistContents(state) }), {
  randomizePlaylist,
})(provideGoToContentScreen(PlaylistScreen))
