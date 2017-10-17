import React, { PureComponent } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Video from 'react-native-video'

import { addToPlaylist, toggleFavorite } from '../actions'
import ContentRow from './ContentRow'

const { width } = Dimensions.get('window')
const nothingFn = () => {}

const styles = StyleSheet.create({
  videoStyle: {
    width,
    height: 200,
    backgroundColor: '#000',
  },
  lyricsContainer: {
    alignItems: 'center',
  },
})

export class ContentScreen extends PureComponent {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    contentId: PropTypes.string.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
  }

  render() {
    const content = this.props.allContents.find(c => c.id === this.props.contentId)

    if (!content) {
      return (
        <View>
          <Text>No content found :(</Text>
        </View>
      )
    }

    return (
      <View>
        <Video
          source={{ uri: `http://192.168.0.20:3000/${content.path}` }}
          resizeMode="cover"
          style={styles.videoStyle}
        />

        <ContentRow
          {...content}
          goTo={nothingFn}
          onStarPress={this.props.toggleFavorite}
          onPlusPress={this.props.addToPlaylist}
        />
        <View style={styles.lyricsContainer}>
          {content.lyrics &&
            content.lyrics.map((lyricsLine, key) => (
              <Text key={key}>{lyricsLine}</Text> // eslint-disable-line
            ))}
        </View>
        <View />
      </View>
    )
  }
}

export default connect(
  ({ contents: { allContents } }) => ({
    allContents,
  }),
  { addToPlaylist, toggleFavorite },
)(ContentScreen)
