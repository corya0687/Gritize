import React, { Component } from 'react';
import { TextInput, Platform, StyleSheet, Text, View,Button, FlatList, List, ListItem } from 'react-native';
import { connect}  from "react-redux"
import { Formik } from 'formik';
import {fetchUser} from './store/actions/userActions'
import {addEvent} from './store/actions/calendarActions'
import DatePicker from 'react-native-datepicker'
import GCalEvent from './store/actions/api/googleCalEvent'

@connect((store) =>{
  return {
    user: store.user,
    calendar: store.calendar.calendar
  };
})

export default class App extends Component<{}> {
  constructor(props) {
    super(props)
  }

  // renderItem(data) {
  //   let { item, index } = data;
  //   return (
  //     <View style={styles.itemBlock}>
  //       <View style={styles.itemMeta}>
  //         <Text style={styles.itemName}>{item.summary}</Text>
  //       </View>
  //     </View>
  //   )
  // }

  render() {
    const googleSignIn = () => this.props.dispatch(fetchUser());
    const isLoggedIn = !!this.props.user.user.id;
    let postEvent;
    console.log(this.props.calendar.events.events)
    if (isLoggedIn) {
      let token = this.props.user.user.accessToken;
      let calendarId = this.props.user.user.calendarId
      postEvent = input => {
        let summary = input.eventSummary
        let calEvent = new GCalEvent(summary,`${summary} event for today`, new Date().toISOString(), new Date().toISOString(), this.props.user.user.email)
        this.props.dispatch(addEvent(token, calendarId, calEvent))
      }
    }
    const eventCollection = this.props.calendar.events.events
    return (
      <View style={styles.container}>
        { isLoggedIn ?
          <View>
            <Text>Add Event</Text>
            <Formik
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  console.log(JSON.stringify(values, null, 2));
                  postEvent(values)
                  actions.setSubmitting(false);
                }, 1000);
              }}
              render={props => (
                <View>
                  <TextInput
                    onChangeText={text => props.setFieldValue('eventSummary', text)}
                    value={props.values.eventSummary}
                  />
                  <Button title="submit" onPress={props.handleSubmit} />
                </View>
              )}
            />
            <Text style={styles.welcome}>
              Current User Email
              {this.props.user.user.email}
            </Text>
            <FlatList
              data={eventCollection}
              keyExtractor={(item, index) => item.etag}
              renderItem={({item}) => <Text>{item.summary}</Text>}
            />
          </View> : <Button onPress={googleSignIn} title="login"/>
        }
      </View>
    );
  }
}
            // <DatePicker
            //   style={{width: 100}}
            //   date=''
            //   mode="date"
            //   placeholder="select date"
            //   format="YYYY-MM-DD"
            //   minDate="2016-05-01"
            //   maxDate="2016-06-01"
            //   confirmBtnText="Confirm"
            //   cancelBtnText="Cancel"
            //   customStyles={{
            //     dateIcon: {
            //       position: 'absolute',
            //       left: 0,
            //       top: 4,
            //       marginLeft: 0
            //     },
            //     dateInput: {
            //       marginLeft: 36
            //     }
            //     // ... You can check the source to find the other keys.
            //   }}
            //   onDateChange={(date) => {this.setState({date: date})}}
            // ></DatePicker>
            // <TextInput
            //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            //   onSubmitEditing={postEvent}
            // />


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
  itemBlock: {
  flexDirection: 'row',
  paddingBottom: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemMeta: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
  },
  itemLastMessage: {
    fontSize: 14,
    color: "#111",
  }
});
