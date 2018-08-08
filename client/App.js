import React, { Component } from 'react';
import { TextInput, Platform, StyleSheet, Text, View,Button, FlatList, List, ListItem, TouchableOpacity } from 'react-native';
import { connect}  from "react-redux"
import { Formik } from 'formik';
import {fetchUser} from './store/actions/userActions'
import {addActivity, deleteActivity, updateActivity} from './store/actions/calendarActions'
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

  renderItem(data) {
    let { item, index } = data;
    const calendarId = this.props.user.user.calendarId
    const token = this.props.user.user.accessToken
    const removeActivity = () => {this.props.dispatch(deleteActivity(token, calendarId, item.id))}
    const editActivity = () => {this.props.dispatch(updateActivity(token, calendarId, item.id))}
    return (
      <View style={styles.itemBlock}>

        <View style={styles.itemMeta}>
          <Text style={styles.itemName}>{item.summary}</Text>
          <TextInput style={styles.itemLastMessage}>{item.description}</TextInput>
        </View>

        <TouchableOpacity onPress={editActivity}>
          <Text style={styles.editActivity} >Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={removeActivity}>
          <Text style={styles.deleteActivity}>X</Text>
        </TouchableOpacity>

      </View>
    )
  }

  buildActivity(token, calendarId, input) {
    let summary = input.eventSummary
    let calEvent = new GCalEvent(summary,`${summary} event for today`, new Date().toISOString(), new Date().toISOString(), this.props.user.user.email)
    this.props.dispatch(addActivity(token, calendarId, calEvent))
  }

  updateActivity(token, calendarId, input) {
    let summary = input.eventSummary
    this.props.dispatch(updateActivity(token, calendarId, calEvent))
  }

  render() {
    const googleSignIn = () => this.props.dispatch(fetchUser());
    const isLoggedIn = !!this.props.user.user.id;
    let buildActivity;
    if (isLoggedIn) {
      let token = this.props.user.user.accessToken;
      let calendarId = this.props.user.user.calendar_id
      buildActivity = this.buildActivity.bind(this,token, calendarId)
    }
    const eventCollection = this.props.calendar.activities.activities
    console.log(eventCollection)
    return (
      <View style={styles.container}>
        { isLoggedIn ?
          <View>
            <Text>Add Event</Text>
            <Formik
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  console.log(JSON.stringify(values, null, 2));
                  buildActivity(values)
                  actions.setSubmitting(false);
                }, 1000);
              }}
              render={props => {
                return (
                <View>
                  <TextInput
                    onChangeText={text => props.setFieldValue('eventSummary', text)}
                    value={props.values.eventSummary}
                  />
                  <Button title="submit" onPress={props.handleSubmit} />
                </View>
              )}
            }
            />
            <Text style={styles.welcome}>
              Current User Email
              {this.props.user.user.email}
            </Text>
            <FlatList
              data={eventCollection}
              keyExtractor={(item, index) => item.etag}
              renderItem={this.renderItem.bind(this)}
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
// ></DatePicker><TextInput
//   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//   onSubmitEditing={buildActivity}
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
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 20,
  flexDirection: 'row',
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
  },
  deleteActivity: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  editActivity: {
    paddingLeft: 10,
    paddingRight: 10,
  }

});
