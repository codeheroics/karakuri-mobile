import { AppRegistry } from 'react-native'
import karakuri from './src/karakuri'

AppRegistry.registerComponent('karakuri', () => karakuri)
AppRegistry.runApplication('karakuri', {
  rootTag: document.getElementById('react-root'),
})
