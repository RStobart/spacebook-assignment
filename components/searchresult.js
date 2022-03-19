import { Component } from 'react/cjs/react.production.min';
import React, { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      alertText: '',
    };
  }

  sendFriendRequest = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.user.user_id}/friends/`, {
      method: 'POST',
      headers: {
        'X-Authorization': userToken,
      },
    }).catch((err) => {
      console.log(err);
      Restart();
    })
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            showAlert: true,
            alertText: 'Friend request sent!',
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
            alertText: 'This user is already your friend',
          });
        } else if (response.status === 404) {
          this.setState({
            showAlert: true,
            alertText: "User no longer exists so you can't add them as a friend",
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
    return (
      <View style={style.searchresult_view}>
        <Text style={style.searchresult_text}>
          {this.props.user.user_givenname}
          {' '}
          {this.props.user.user_familyname}
        </Text>
        <TouchableOpacity style={style.searchresult_button} accessible accessibilityLabel="Send friend request" onPress={() => this.sendFriendRequest()} title="Send friend request">
          <Text>SEND FRIEND REQUEST</Text>
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

export default SearchResult;
