// FormikReactNativeTextInput.js
import * as React from 'react';
import { TextInput } from 'react-native';

export default class FormikReactNativeTextInput extends React.Component {
  handleChange = (value: string) => {
    // remember that onChangeText will be Formik's setFieldValue
    this.props.onChangeText(this.props.name, value);
  };

  render() {
    // we want to pass through all the props except for onChangeText
    const { onChangeText, ...otherProps } = this.props;
    return (
      <TextInput
        onChangeText={this.handleChange}
        {...otherProps} // IRL, you should be more explicit when using TS
      />
    );
  }
}
