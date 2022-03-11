import { Component } from 'react/cjs/react.production.min';
import React, { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class CreatePostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      showAlert: false,
      alertText: '',
    };
  }

  post = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const userId = await AsyncStorage.getItem('@user_id');
    return fetch(`http://localhost:3333/api/1.0.0/user/${userId}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
      body: JSON.stringify({ text: this.state.text }),
    }).catch((err) => {
      console.log(err);
      Restart();
    })
      .then((response) => {
        if (response.status === 201) {
          this.setState({ text: '' });
          this.props.navigation.navigate('ProfileNav');
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
            alertText: 'User not found, cannot create post',
          });
        } else { // 500
          this.setState({
            showAlert: true,
            alertText: 'Something went wrong, try again later',
          });
        }
      });
  };

  saveDraft = async () => {
    const userId = await AsyncStorage.getItem('@user_id');
    const userDrafts = await AsyncStorage.getItem(`@drafts${userId}`);
    let tempDrafts = [];
    if (userDrafts == null || userDrafts == '"[]"') {
      tempDrafts = [];
    } else {
      tempDrafts = JSON.parse(userDrafts);
    }
    tempDrafts.push({ draftId: (tempDrafts.length + 1), text: this.state.text });
    await AsyncStorage.setItem(`@drafts${userId}`, JSON.stringify(tempDrafts))
      .then(() => {
        this.setState({ text: '' });
        this.props.navigation.navigate('Draft posts');
      });
  };

  render() {
    return (
      <View style={style.createpost_view}>
        <Text style={style.createpost_text}>What do you want to say?</Text>
        <TextInput accessible accessibilityLabel="Text input for post" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.text} onChangeText={(text) => this.setState({ text })} />
        <View style={style.createpost_buttonview}>
          <TouchableOpacity style={style.createpost_button} accessible accessibilityLabel="Create post" onPress={() => this.post()}><Text style={style.createpost_buttontext}>CREATE POST</Text></TouchableOpacity>
          <TouchableOpacity style={style.createpost_button} accessible accessibilityLabel="Save as draft" onPress={() => this.saveDraft()}><Text style={style.createpost_buttontext}>SAVE AS DRAFT</Text></TouchableOpacity>
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

export default CreatePostScreen;
