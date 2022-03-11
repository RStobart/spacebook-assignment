import { Component } from 'react/cjs/react.production.min';
import React, { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class EditEmailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      showAlert: false,
      alertText: '',
    };

    this.props.navigation.setOptions({ headerShown: false });
  }

  updateEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        showAlert: true,
        alertText: 'Invalid email',
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
              alertText: 'Unable to update email due to bad data',
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
              alertText: 'You cannot update another users email',
            });
          } else if (response.status === 404) {
            this.setState({
              showAlert: true,
              alertText: 'User missing, unable to update email',
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
        <Text style={style.editemail_text}>Enter new email:</Text>
        <TextInput accessible accessibilityLabel="New email field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
        <TouchableOpacity style={style.editemail_button} accessible accessibilityLabel="Update Email" onPress={() => this.updateEmail()}>
          <Text>UPDATE EMAIL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.editemail_button} accessible accessibilityLabel="Go back" accessibilityHint="Return to the edit profile menu" onPress={() => this.props.navigation.navigate("EditMenu")}>
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

export default EditEmailScreen;
