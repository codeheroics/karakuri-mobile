import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  rowText: {
    fontSize: 16,
  },
})

export class HomeRow extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    item: PropTypes.string,
  }

  onPress = () => {
    this.props.onPress(this.props.item)
  };

  render() {
    const { item } = this.props
    return (
      <TouchableNativeFeedback
        onPress={this.onPress}
      >
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {item}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
