import { Component } from 'react/cjs/react.production.min';
import React, { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class EditPasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      showAlert: false,
      alertText: '',
    };

    this.props.navigation.setOptions({ headerShown: false });
  }

  updatePassword = async () => {
    if (this.state.password.length < 6) {
      this.setState({
        showAlert: true,
        alertText: 'Password is too short, must be longer than 5 characters',
      });
    } else {
      const userToken = await AsyncStorage.getItem('@session_token');
      const userId = await AsyncStorage.getItem('@user_id');
      return fetch(`http://localhost:3333/api/1.0.0/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
        body: JSON.stringify(this.state),
      }).catch((err) => {
        console.log(err);
        Restart();
      })
        .then((response) => {
          if (response.status === 200) {
            this.props.navigation.navigate('ProfileNav');
          } else if (response.status === 400) {
            this.setState({
              showAlert: true,
              alertText: 'Unable to update password due to bad data',
            });
          } else if (response.status === 401) {
            this.removeLoginDetails();
            this.setState({
              showAlert: true,
              alertText: 'Login session lost, please log in again',
            });
            Restart();
          } else if (response.status === 403) {
            this.setState({
              showAlert: true,
              alertText: 'You cannot update another users password',
            });
          } else if (response.status === 404) {
            this.setState({
              showAlert: true,
              alertText: 'User missing, unable to update password',
            });
          } else { // 500
            this.setState({
              showAlert: true,
              alertText: 'Something went wrong, try again later',
            });
          }
        });
    }
  };

  render() {
    return (
      <View style={style.editemail_view}>
        <Text style={style.editpassword_text}>Enter new password:</Text>
        <TextInput accessible accessibilityLabel="New password field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.password} onChangeText={(password) => this.setState({ password })} />
        <TouchableOpacity style={style.editpassword_button} accessible accessibilityLabel="Update password" onPress={() => this.updatePassword()}>
          <Text>UPDATE PASSWORD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.editpassword_button} accessible accessibilityLabel="Go back" accessibilityHint="Return to the edit profile menu" onPress={() => this.props.navigation.navigate()}>
          <Text>GO BACK</Text>
        </TouchableOpacity>

        <AwesomeAlert
          accessible
          accessibilityLabel={this.state.alertText}
          show={this.state.showAlert}
          message={this.state.alertText}
          showConfirmButton
          confirmText="OK"
          onConfirmPressed={() => {
            this.setState({
              showAlert: false,
            });
          }}
        />
      </View>
    );
  }
}

export default EditPasswordScreen;
