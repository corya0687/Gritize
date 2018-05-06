import React, { Component } from 'react';
import {
  TextInput, Platform, StyleSheet, Text, View, Alert, Button, Image
} from 'react-native';
import {signIn} from './components/actions/api/googleAuth'
import * as calendarClient from './components/actions/api/googleCalendar'

export default class App extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      "currentUser":{},
      "calendarName": null,
      "accessToken": null
    }
  }

  render() {

    const googleSignIn = signIn.bind(this)

    // const googleCalendars = listCalendars.bind(null, this.manager)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Current User Email
          {this.state.currentUser.email}
        </Text>
        { !this.state.currentUser.email ?
            <Button onPress={googleSignIn} title="login"/> :
              <View>
                <Text>Add Event</Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}        onChangeText={(calendarName) => this.setState({calendarName})}
                  value={this.state.calendarName}
                />
              </View>
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
