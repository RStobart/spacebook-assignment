import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class CreatePostScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            showAlert: false,
            alertText: ""
        };
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
                    //Posted successfully
                } else if (response.status === 401) {
                    this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        alertText: "Login session lost, please log in again"
                    });
                    Restart();
                } else if (response.status === 404) {
                    this.setState({
                        showAlert: true,
                        alertText: "User not found, cannot create post"
                     });
                } else {//500
                    this.setState({
                        showAlert: true,
                        alertText: "Something went wrong, try again later"
                     });
                }
            })
    }

    saveDraft = async () => {
        let userId = await AsyncStorage.getItem("@user_id");
        let userDrafts = await AsyncStorage.getItem("@drafts" + userId);
        let tempDrafts = [];
        if (userDrafts == null || userDrafts == "\"[]\"") {
            console.log("nullset");
            tempDrafts = [];
        }
        else {
            tempDrafts = JSON.parse(userDrafts);
        }
        console.log(tempDrafts);
        tempDrafts.push({ "draftId": (tempDrafts.length + 1), "text": this.state.text });
        await AsyncStorage.setItem("@drafts" + userId, JSON.stringify(tempDrafts))
        .then(() => {
            this.setState({
                showAlert: true,
                alertText: "Saved draft"
             });
        });
    }

    render() {

        return (
            <View>
                <Text>What do you want to say?</Text>
                <TextInput style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.text} onChangeText={(text) => this.setState({ text })} />
                <Button title="Post" onPress={() => this.post()} />
                <Button title="Save as draft" onPress={() => this.saveDraft()} />

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

export default CreatePostScreen;