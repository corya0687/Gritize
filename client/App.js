import React, { Component } from 'react';
import {
  TextInput, Platform, StyleSheet, Text, View, Alert, Button, Image
} from 'react-native';
import { connect}  from "react-redux"
import {fetchUser} from './store/actions/userActions'
import DatePicker from 'react-native-datepicker'
import GCalEvent from './store/actions/api/googleCalEvent'
import GoogleCalendar from './store/actions/api/googleCalendar'

@connect((store) =>{
  return {
    user: store.user,
    calendar: store.calendar
  };
})

export default class App extends Component<{}> {
  constructor(props) {
    super(props)
  }

  render() {
    const googleSignIn = () => this.props.dispatch(fetchUser());
    const isLoggedIn = !!this.props.user.user.id;
    let postEvent;
    if (isLoggedIn) {
      let token = this.props.user.user.accessToken;
      let calendarId = this.props.user.user.calendarId
      postEvent = input => {
        let summary = input.nativeEvent.text
        let calEvent = new GCalEvent(summary,`${summary} event for today`, new Date().toISOString(), new Date().toISOString(), this.props.user.user.email)
        GoogleCalendar.addEvent(token, calendarId, calEvent)
      }
    }

    return (
      <View style={styles.container}>
        { isLoggedIn ?
            <View>
              <Text style={styles.welcome}>
                Current User Email
                {this.props.user.user.email}
              </Text>
              <Text>Add Event</Text>
              <DatePicker
                style={{width: 100}}
                date=''
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              ></DatePicker>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onSubmitEditing={postEvent}
              />
            </View> : <Button onPress={googleSignIn} title="login"/>
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
