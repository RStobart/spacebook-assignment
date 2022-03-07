import { Component } from "react/cjs/react.production.min";
import { View, Text, TextInput } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';

class ManageDraftScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
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
        })
            .then((response) => {
                if (response.status === 201) {
                    //Hooray, created
                } else if (response.status === 400) {
                    //Bad req
                } else if (response.status === 401) {
                    //Unauthorised
                } else if (response.status === 404) {
                    //User not found, fucked
                } else {
                    //500
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
            </View>
        )
    }
}

export default ManageDraftScreen;