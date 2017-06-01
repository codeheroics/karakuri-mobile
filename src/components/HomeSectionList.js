import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SectionList, View, Text } from 'react-native'
import { identity } from 'lodash'

import { HomeRow } from './HomeRow'

const nullFn = () => null

const INITIAL_ROWS_TO_RENDER = 20

const styles = {
  sectionHeaderView: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
  },
  sectionHeaderText: { color: '#FFF' },
}

export class HomeSectionList extends PureComponent {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    directoryName: PropTypes.string.isRequired,
    onGroupSelect: PropTypes.func.isRequired,
  }

  onGroupSelect = group => {
    this.props.onGroupSelect(group)
  };

  renderItem = ({ item }) => (
    <HomeRow item={item} onPress={this.onGroupSelect} />
  )

  renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeaderView}>
      <Text style={styles.sectionHeaderText}>{section.key}</Text>
    </View>
  )

  render() {
    return (
      <SectionList
        sections={this.props.groups}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        keyExtractor={identity}
        initialNumToRender={INITIAL_ROWS_TO_RENDER}
      />
    )
  }
}
