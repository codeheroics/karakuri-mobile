import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AlphabetListView from 'react-native-alphabetlistview'

import { HomeRow } from './HomeRow'

const alphabetListStyles = {
  width: 40,
}

export class HomeListView extends PureComponent {
  static propTypes = {
    groups: PropTypes.object.isRequired,
    directoryName: PropTypes.string.isRequired,
    onGroupSelect: PropTypes.func.isRequired,
  }

  onGroupSelect = group => {
    this.props.onGroupSelect(group)
  };

  render() {
    return (
      <AlphabetListView
        data={this.props.groups}
        cell={HomeRow}
        cellHeight={50}
        cellProps={{ onPress: this.onGroupSelect }}
        pageSize={5}
        sectionHeader={() => null}
        sectionHeaderHeight={0}
        sectionListStyle={alphabetListStyles}
      />
    )
  }
}
