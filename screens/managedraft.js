import { Component } from 'react/cjs/react.production.min';
import React, { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style';

class ManageDraftScreen extends Component {
  constructor(props) {
    super(props);

    if (this.props.route.params.draft.text == undefined) {
      this.state = {
        text: '',
        showAlert: false,
        alertText: '',
      };
    } else {
      this.state = {
        text: this.props.route.params.draft.text,
        showAlert: false,
        alertText: '',
      };
    }

    this.props.navigation.setOptions({ headerShown: false });
  }

  updateDraft = async (newText) => {
    const userId = await AsyncStorage.getItem('@user_id');
    const draftList = JSON.parse(await AsyncStorage.getItem(`@drafts${userId}`));
    const newDraftList = [];
    draftList.forEach((thisDraft) => {
      if (thisDraft.draftId == this.props.route.params.draft.draftId) {
        thisDraft.text = newText;
      }
      newDraftList.push(thisDraft);
    });
    await AsyncStorage.setItem(`@drafts${userId}`, JSON.stringify(newDraftList)).then(
      this.props.navigation.goBack(),
    );
  };

  deleteDraft = async () => {
    const userId = await AsyncStorage.getItem('@user_id');
    const draftList = JSON.parse(await AsyncStorage.getItem(`@drafts${userId}`));
    const newDraftList = [];
    draftList.forEach((thisDraft) => {
      if (thisDraft.draftId != this.props.route.params.draft.draftId) {
        newDraftList.push(thisDraft);
      }
    });
    await AsyncStorage.setItem(`@drafts${userId}`, JSON.stringify(newDraftList));
  };

  deleteDraftClick = async () => {
    this.deleteDraft();
    this.props.navigation.goBack();
  };

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
          this.deleteDraft();
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

  render() {
    return (
      <View style={style.managedraft_view}>
        <Text style={style.managedraft_text}>
          Draft
          {this.props.route.params.draft.draftId}
        </Text>
        <TextInput style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.text} onChangeText={(text) => this.setState({ text })} />
        <View style={style.managedraft_buttonview}>
          <TouchableOpacity style={style.managedraft_button} accessible accessibilityLabel="Create post" onPress={() => this.post()}>
            <Text>CREATE POST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.managedraft_button} accessible accessibilityLabel="Update draft" onPress={() => this.updateDraft(this.state.text)}>
            <Text>UPDATE DRAFT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.managedraft_button} accessible accessibilityLabel="Delete draft" onPress={() => this.deleteDraftClick()}>
            <Text>DELETE DRAFT</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={style.managedraft_returnbutton} accessible accessibilityLabel="Go back" accessibilityHint="Return to your list of drafts" onPress={() => this.props.navigation.goBack()}>
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

export default ManageDraftScreen;
