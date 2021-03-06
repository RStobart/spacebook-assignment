import { Component } from 'react/cjs/react.production.min';
import { TouchableOpacity } from 'react-native-web';
import React, { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class Friend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPhoto: '',
      showAlert: false,
      alertText: '',
    };
  }

  componentDidMount() {
    this.getUserPhoto();
  }

  getUserPhoto = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.user.user_id}/photo`, {
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
          return response.blob();
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
            alertText: 'Photo not found, user does not exist',
          });
        } else { // 500
          this.setState({
            showAlert: true,
            alertText: 'Something went wrong, try again later',
          });
        }
      })
      .then(async (responseBlob) => {
        const photoData = URL.createObjectURL(responseBlob);
        this.setState({ userPhoto: photoData });
      });
  };

  render() {
    return (
      <View style={style.friend_view}>
        <View style={style.friend_profileview}>
          <Image style={style.friend_image} source={{ uri: this.state.userPhoto }} />
          <View>
            <Text style={style.friend_text}>
              {this.props.user.user_givenname}
              {' '}
              {this.props.user.user_familyname}
            </Text>
          </View>
          <TouchableOpacity style={style.viewprofile_button} accessible accessibilityLabel="View profile of this user" onPress={() => this.props.navigation.navigate('Profile', { userId: this.props.user.user_id })}>
            <Text>VIEW PROFILE</Text>
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

export default Friend;
