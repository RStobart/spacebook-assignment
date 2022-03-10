import { Component } from "react/cjs/react.production.min";
import { View, Text, TextInput } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

class ManageDraftScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            showAlert: false,
            alertText: ""
        };
    }

    updateDraft = async (newText) => {
        let userId = await AsyncStorage.getItem("@user_id");
        let draftList = JSON.parse(await AsyncStorage.getItem("@drafts" + userId));
        let newDraftList = [];
        draftList.forEach((thisDraft) => {
            if (thisDraft.draftId == this.props.route.params.draft.draftId) {
                thisDraft.text = newText;
            }
            newDraftList.push(thisDraft);
        });
        await AsyncStorage.setItem("@drafts" + userId, JSON.stringify(newDraftList));
        this.props.navigation.goBack();
    }

    deleteDraft = async () => {
        let userId = await AsyncStorage.getItem("@user_id");
        let draftList = JSON.parse(await AsyncStorage.getItem("@drafts" + userId));
        let newDraftList = [];
        draftList.forEach((thisDraft) => {
            if (thisDraft.draftId != this.props.route.params.draft.draftId) {
                newDraftList.push(thisDraft);
            }
        });
        await AsyncStorage.setItem("@drafts" + userId, JSON.stringify(newDraftList));
        this.props.navigation.goBack();
    }

    post = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        let userId = await AsyncStorage.getItem("@user_id");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userToken
            },
            body: JSON.stringify(this.state)
        }).catch((err) => {
            console.log(err);
            Restart();
        })
        .then((response) => {
            if (response.status === 201) {
                this.setState({
                    showAlert: true,
                    text: "Draft successfully posted"
                });
                this.deleteDraft();
            } else if (response.status === 401) {
                this.removeLoginDetails();
                this.setState({
                    showAlert: true,
                    text: "Login session lost, please log in again"
                });
                Restart();
            } else if (response.status === 404) {
                this.setState({
                    showAlert: true,
                    text: "User not found, cannot create post"
                 });
            } else {//500
                this.setState({
                    showAlert: true,
                    text: "Something went wrong, try again later"
                 });
            }
        })
    }

    render() {
        return (
            <View>
                <TextInput style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.props.route.params.draft.text} onChangeText={(text) => this.setState({ text })} />
                <Button title="Post" onPress={() => this.post()} />
                <Button title="Update draft" onPress={() => this.updateDraft()} />
                <Button title="Delete draft" onPress={() => this.deleteDraft()} />

                <AwesomeAlert
                        show={this.state.showAlert}
                        message={this.state.alertText}
                        showConfirmButton={true}
                        confirmText="OK"
                        onConfirmPressed={() => {
                            this.setState({
                                showAlert: false 
                             });
                        }}
                    />
            </View>
        )
    }
}

export default ManageDraftScreen;