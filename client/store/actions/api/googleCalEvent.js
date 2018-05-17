class GCalEvent {
  constructor(summary, description, start, endDateTime, userEmail) {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    this.summary = summary;
    this.description = description;
    this.start = {'dateTime': start, 'timeZone': timezone};
    this.end = {'dateTime': endDateTime, 'timeZone': timezone};
    this.fileUrl = '';
    this.attendees = [{'email': userEmail}];
    this.reminders = {
      'useDefault': false,
      'overrides': [
        {'method': 'popup', 'minutes': 10}
      ]
    }
  }
}

export default GCalEvent
