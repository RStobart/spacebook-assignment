import { Component } from 'react/cjs/react.production.min';
import React, { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import FriendRequest from '../components/friendrequest';
import style from '../style/style';

class FriendReqScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      potentialFriends: [],
      showAlert: false,
      alertText: '',
    };

    this.getUserFriendRequests();
  }

  getUserFriendRequests = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch('http://localhost:3333/api/1.0.0/friendrequests/', {
      method: 'GET',
      headers: {
        'X-Authorization': userToken,
      },
    }).catch((err) => {
      console.log(err);
      Restart();
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          this.removeLoginDetails();
          this.setState({
            showAlert: true,
            alertText: 'Login session lost, please log in again',
          });
          Restart();
        } else { // 500
          this.setState({
            showAlert: true,
            alertText: 'Something went wrong, try again later',
          });
        }
      })
      .then(async (potentialFriends) => {
        this.setState({ potentialFriends });
      });
  };

  render() { // need to figure out how to unrender requests that ahve been accepted or rejected
    const requestList = [];
    let keyNum = 0;

    this.state.potentialFriends.forEach((thisUser) => {
      requestList.push(
        <FriendRequest key={keyNum} user={thisUser} />,
      );
      keyNum++;
    });

    if (requestList.length === 0) {
      return (
        <View style={style.friendreq_defaultview}>
          <Text>Noone wants to be your friend atm :(</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        {requestList}

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
      </ScrollView>
    );
  }
}

export default FriendReqScreen;
