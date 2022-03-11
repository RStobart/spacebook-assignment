import { Component } from 'react/cjs/react.production.min';
import React, { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class FriendRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: false,
      showAlert: false,
      alertText: '',
    };
  }

  accept = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch(`http://localhost:3333/api/1.0.0/friendrequests/${this.props.user.user_id}`, {
      method: 'POST',
      headers: {
        'X-Authorization': userToken,
      },
    }).catch((err) => {
      console.log(err);
      Restart();
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            showAlert: true,
            alertText: `${this.props.user.first_name} ${this.props.user.last_name} is now your friend`,
          });
          return this.setState({
            hide: true,
          });
        } if (response.status === 401) {
          this.removeLoginDetails();
          this.setState({
            showAlert: true,
            alertText: 'Login session lost, please log in again',
          });
          Restart();
        } else if (response.status === 404) {
          this.setState({
            showAlert: true,
            alertText: 'Request not found, cannot add as friend',
          });
        } else { // 500
          this.setState({
            showAlert: true,
            alertText: 'Something went wrong, try again later',
          });
        }
      });
  };

  reject = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch(`http://localhost:3333/api/1.0.0/friendrequests/${this.props.user.user_id}`, {
      method: 'DELETE',
      headers: {
        'X-Authorization': userToken,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            showAlert: true,
            alertText: `Friend request from ${this.props.user.first_name} ${this.props.user.last_name} rejected`,
          });
          return this.setState({
            hide: true,
          });
        } if (response.status === 401) {
          this.removeLoginDetails();
          this.setState({
            showAlert: true,
            alertText: 'Login session lost, please log in again',
          });
          Restart();
        } else if (response.status === 404) {
          this.setState({
            showAlert: true,
            alertText: 'Request not found, cannot reject as friend',
          });
        } else { // 500
          this.setState({
            showAlert: true,
            alertText: 'Something went wrong, try again later',
          });
        }
      });
  };

  render() {
    if (!this.state.hide) {
      return (
        <View style={style.friendreq_view}>
          <Text style={style.friendreq_text}>
            {this.props.user.first_name}
            {' '}
            {this.props.user.last_name}
          </Text>
          <View style={style.friendreq_buttonview}>
            <TouchableOpacity style={style.friendreq_button} accessible accessibilityLabel="Accept" accessibilityHint="Accept the friend request" onPress={() => this.accept()}>
              <Text>ACCEPT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.friendreq_button} accessible accessibilityLabel="Reject" accessibilityHint="Reject the friend request" onPress={() => this.reject()}>
              <Text>REJECT</Text>
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
    return (
      <View />
    );
  }
}

export default FriendRequest;
