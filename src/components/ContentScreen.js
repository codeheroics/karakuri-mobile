import React, { PureComponent } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Video from 'react-native-video'

import { addToPlaylist, toggleFavorite } from '../actions'
import { getAllContents } from '../selectors/contents'
import ContentRow from './ContentRow'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width,
    height: 200,
    backgroundColor: '#000',
  },
  lyrics: {
    flex: 1,
  },
  lyricsContentContainer: {
    alignItems: 'center',
    padding: 5,
  },
  lyricsLine: {
    textAlign: 'center',
  },
})

export class ContentScreen extends PureComponent {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { content: null, lyrics: [] }
  }

  componentWillMount() {
    const content = this.props.allContents.find(c => c.id === this.props.id)
    if (content) {
      this.setState({ content })
      this.getLyrics(content)
    }
  }

  getLyrics = ({ id }) =>
    fetch(this.props.url.concat(`/contents/${id}`))
      .then(response => response.json())
      .then(({ lyrics }) => this.setState({ lyrics }))
      .catch(err => console.error(err))

  render() {
    const { content, lyrics } = this.state
    const { url } = this.props

    if (!content) {
      return (
        <View>
          <Text>No content found :(</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Video source={{ uri: `${url}/${content.path}` }} resizeMode="cover" style={styles.video} />

        <ContentRow
          {...content}
          onPlusPress={this.props.addToPlaylist}
          onStarPress={this.props.toggleFavorite}
        />
        <ScrollView contentContainerStyle={styles.lyricsContentContainer} style={styles.lyrics}>
          {lyrics &&
            lyrics.map((lyricsLine, key) => (
              <Text
                style={styles.lyricsLine}
                key={key} // eslint-disable-line react/no-array-index-key
              >
                {lyricsLine}
              </Text>
            ))}
        </ScrollView>
        <View />
      </View>
    )
  }
}

export default connect(
  state => ({
    allContents: getAllContents(state),
    url: state.connection.url,
  }),
  { addToPlaylist, toggleFavorite },
)(ContentScreen)
