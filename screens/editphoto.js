import { Component } from 'react/cjs/react.production.min';
import React, { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class EditPhotoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false,
      alertText: '',
    };

    this.props.navigation.setOptions({ headerShown: false });
  }

  updatePhoto = async (photo) => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const userId = await AsyncStorage.getItem('@user_id');
    const photoRes = await fetch(photo.uri);
    const photoBlob = await photoRes.blob();
    return fetch(`http://localhost:3333/api/1.0.0/user/${userId}/photo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/png',
        'X-Authorization': userToken,
      },
      body: photoBlob,
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
            alertText: 'Unable to update photo due to bad photo data',
          });
        } else if (response.status === 401) {
          this.removeLoginDetails();
          this.setState({
            showAlert: true,
            alertText: 'Login session lost, please log in again',
          });
          Restart();
        } else if (response.status === 404) {
          this.setState({
            showAlert: true,
            alertText: 'User missing, unable to update photo',
          });
        } else { // 500
          this.setState({
            showAlert: true,
            alertText: 'Something went wrong, try again later',
          });
        }
      });
  };

  choosePhoto = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    console.log(photo);
    if (!photo.cancelled) {
      this.updatePhoto(photo);
    }
  };

  render() {
    return (
      <View style={style.editphoto_view}>
        <TouchableOpacity style={style.editphoto_button} accessible accessibilityLabel="Choose new profile photo" onPress={() => this.choosePhoto()}>
          <Text>CHOOSE A NEW PROFILE PHOTO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.editphoto_button} accessible accessibilityLabel="Go back" accessibilityHint="Return to the edit profile menu" onPress={() => this.props.navigation.goBack()}>
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

export default EditPhotoScreen;
