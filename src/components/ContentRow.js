import React, { Component, PropTypes } from 'react'
import { PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  main: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
  },
})

export class ContentRow extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.addToPlaylist = this.onPress.bind(this)
  }

  onPress() {
    this.props.addToPlaylist(this.props.id)
  }

  render() {
    const { type, songName } = this.props
    return (
      <View style={styles.row}>
        <TouchableHighlight
          onPress={this.addToPlaylist}
          underlayColor="#99d9f4"
        >
          <View style={styles.main}>
            <Text style={styles.mainText}>
              {type} - {songName}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
