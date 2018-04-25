import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Alert, Button, Image
} from 'react-native';
import {signIn} from './components/config/googleAuth'
// import {listCalendars} from './lib/googleCalendar'

export default class App extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      "currentUser":{},
    }
  };

  render() {

    const googleSignIn = signIn.bind(this)
    // const googleCalendars = listCalendars.bind(null, this.manager)
    console.log(this.state.currentUser)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          {toString(this.state.currentUser)}
        </Text>
        { !this.state.currentUser.loggedIn ?
            <Button onPress={googleSignIn} title="login"/> :
            <Text>Hello bud</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
