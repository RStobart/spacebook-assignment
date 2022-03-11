import React, { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import { Component } from 'react/cjs/react.production.min';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      showAlert: false,
      alertText: '',
    };
  }

  login = async () => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        showAlert: true,
        alertText: 'Invalid email',
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        showAlert: true,
        alertText: 'Password is too short, must be longer than 5 characters',
      });
    } else {
      return fetch('http://localhost:3333/api/1.0.0/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      }).catch((err) => {
        console.log(err);
        Restart();
      })
        .then((response) => {
          if (response.status === 201) {
            this.setState({
              showAlert: true,
              alertText: 'Account successfully created',
            });
            return response.json();
          } if (response.status === 400) {
            this.setState({
              showAlert: true,
              alertText: 'Unable to create user due to bad data, please try again',
              first_name: '',
              last_name: '',
              email: '',
              password: '',
            });
          } else { // 500
            this.setState({
              showAlert: true,
              alertText: 'Something went wrong, try again later',
            });
          }
        })
        .then(async (responseJson) => {
          await AsyncStorage.setItem('@user_id', responseJson.id);
          this.props.navigation.navigate('Login');
        });
    }
  };

  render() {
    return (
      <View style={style.signup_view}>
        <Text style={style.signup_text}>First name:</Text>
        <TextInput accessible accessibilityLabel="First name field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.first_name} onChangeText={(first_name) => this.setState({ first_name })} />
        <Text style={style.signup_text}>Last name:</Text>
        <TextInput accessible accessibilityLabel="Last name field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.last_name} onChangeText={(last_name) => this.setState({ last_name })} />
        <Text style={style.signup_text}>Email:</Text>
        <TextInput accessible accessibilityLabel="Email field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
        <Text style={style.signup_text}>Password:</Text>
        <TextInput accessible accessibilityLabel="Password field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.password} onChangeText={(password) => this.setState({ password })} secureTextEntry />
        <TouchableOpacity style={style.signup_button} accessible accessibilityLabel="Create account" onPress={() => this.login()}>
          <Text>CREATE ACCOUNT</Text>
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

export default SignupScreen;
