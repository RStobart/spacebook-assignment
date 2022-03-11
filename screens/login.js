import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import React, { View, Text } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showAlert: false,
      alertText: '',
    };
  }

  checkForLogin = async () => {
    const potentialToken = await AsyncStorage.getItem('@session_token');
    const potentialId = await AsyncStorage.getItem('@user_id');
    if (potentialToken != null && potentialId != null) {
      this.props.navigation.navigate('butts', { userId: potentialId });
    }
  };

  login = async () => fetch('http://localhost:3333/api/1.0.0/login', { // test@email.com beefboy
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: this.state.email, password: this.state.password }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } if (response.status === 400) {
        this.setState({
          email: '',
          password: '',
          showAlert: true,
          alertText: 'Invalid email or password',
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
      await AsyncStorage.setItem('@session_token', responseJson.token);
      this.props.navigation.navigate('butts', { userId: responseJson.id });
    });

  render() {
    this.checkForLogin();

    return (
      <View style={style.login_view}>
        <Text style={style.login_text}>Enter email:</Text>
        <TextInput accessible accessibilityLabel="Email field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
        <Text style={style.login_text}>Enter password:</Text>
        <TextInput accessible accessibilityLabel="Password field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.password} onChangeText={(password) => this.setState({ password })} secureTextEntry />
        <View style={style.login_buttonview}>
          <TouchableOpacity style={style.login_button} accessible accessibilityLabel="Log in" onPress={() => this.login()}>
            <Text>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.login_button} accessible accessibilityLabel="Sign up and create and account" onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>DON'T HAVE AN ACCOUNT?</Text>
          </TouchableOpacity>
        </View>

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

export default LoginScreen;
