import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  AsyncStorage,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native'
import { connect } from 'react-redux'

import { connectToServer } from '../actions'
import { MAIN_SCREEN } from '../constants/screens'
import * as Colors from '../constants/colors'

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  titleContainer: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: Colors.text,
  },
  contentContainer: {
    margin: 20,
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  errorMessage: {
    color: 'red',
  },
})

export class ConnectionScreen extends Component {
  static propTypes = {
    connectToServer: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    isLoading: false,
    errorMessage: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      hostname: '',
      port: '3000',
      username: '',
      isFormDirty: false,
    }
  }

  componentWillMount() {
    Promise.all([
      AsyncStorage.getItem('username'),
      AsyncStorage.getItem('hostname'),
      AsyncStorage.getItem('port'),
    ]).then(([username, hostname, port]) => {
      this.setState({ username, hostname, port }, () => {
        if (username && hostname && port) {
          this.connect()
        }
      })
    })
  }

  connect = () => {
    let { hostname, port = '80', username } = this.state
    hostname = hostname.trim()
    port = port.trim()
    username = username.trim()
    if (!username) return this.setState({ message: 'Gimme an username' })
    if (!hostname) return this.setState({ message: 'Gimme a hostname' })

    this.setState({ isFormDirty: false })

    return Promise.all([
      AsyncStorage.setItem('username', username),
      AsyncStorage.setItem('hostname', hostname),
      AsyncStorage.setItem('port', port),
    ]).then(() =>
      this.props
        .connectToServer({ hostname, port, username })
        .then(() => this.props.navigation.navigate(MAIN_SCREEN))
        .catch(() => {}),
    )
  }

  setHostName = hostname => this.setState({ isFormDirty: true, hostname })

  setPort = port => this.setState({ isFormDirty: true, port })

  setUserName = username => this.setState({ isFormDirty: true, username })

  render() {
    const { isLoading, errorMessage } = this.props
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={50}
        style={styles.container}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Karakuri</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            onChangeText={this.setUserName}
            placeholder="Enter a username"
            value={this.state.username}
          />

          <Text style={styles.label}>Hostname:</Text>
          <TextInput
            onChangeText={this.setHostName}
            placeholder="Enter a hostname"
            value={this.state.hostname}
          />

          <Text style={styles.label}>Port:</Text>
          <TextInput
            onChangeText={this.setPort}
            placeholder="Enter a port"
            value={this.state.port}
          />

          <Button
            disabled={isLoading && !this.state.isFormDirty}
            onPress={this.connect}
            color={Colors.darkPrimary}
            title="Connect"
          />

          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  ({ connection: { isLoading, errorMessage } }) => ({
    isLoading,
    errorMessage,
  }),
  { connectToServer },
)(ConnectionScreen)
