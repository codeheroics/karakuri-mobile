import React, { Component, PropTypes, View } from 'react'
import AlphabetListView from 'react-native-alphabetlistview'

import { HomeRow } from './HomeRow'

const alphabetListStyles = {
  width: 40,
}

export class HomeListView extends Component {
  static propTypes = {
    groups: PropTypes.object.isRequired,
    directoryName: PropTypes.string.isRequired,
    onGroupSelect: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.onGroupSelect = this.onGroupSelect.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    // Quick, but absolutely necessary performance win
    if (nextProps.directoryName === this.props.directoryName) return false
    return true
  }

  onGroupSelect(group) {
    this.props.onGroupSelect(group)
  }

  render() {
    return (
      <AlphabetListView
        data={this.props.groups}
        cell={HomeRow}
        cellHeight={100}
        cellProps={{ onPress: this.onGroupSelect }}
        pageSize={5}
        sectionHeader={View}
        sectionHeaderHeight={0}
        sectionListStyle={alphabetListStyles}
      />
    )
  }
}
