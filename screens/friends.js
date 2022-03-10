import { View, Text } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Friend from "../components/friend.js";
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class FriendsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [],
            showAlert: false,
            alertText: ""
        }

        this.searchForUsers();
    }

    searchForUsers = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/search?search_in=friends", {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            },
        }).catch((err) => {
            console.log(err);
            Restart();
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }else if(response.status === 400){
                    this.setState({
                        showAlert: true,
                        text: "Sorry, couldn't retrieve friend list"
                    });
                }else if(response.status === 401){
                    this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        text: "Login session lost, please log in again"
                    });
                    Restart();
                }else{//500
                    this.setState({
                        showAlert: true,
                        text: "Something went wrong, try again later"
                     });
                }
            })
            .then(async (friends) => {
                this.setState({ friends });
            })
    }

    render() {
        let friendResults = [];
        let keyNum = 0;

        this.state.friends.forEach((thisFriend) => {
            friendResults.push(
                <Friend key={keyNum} user={thisFriend} />
            );
            keyNum++;
        });

        if (friendResults.length === 0) {
            return (
                <View>
                    <Text>You have no friends</Text>
                </View>
            )
        }

        return (
            <View>
                {friendResults}

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

export default FriendsScreen;