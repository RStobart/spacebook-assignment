import { View, Text } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Friend from "../components/friend.js";
import {Restart} from 'fiction-expo-restart';

class FriendsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: []
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
                } else if (response.status === 400) {
                    //Invalid search
                } else if (response.status === 401) {
                    //Unauthorized
                } else {
                    //500
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
                    <Text>You have none friends m8 :'(</Text>
                </View>
            )
        }

        return (
            <View>
                {friendResults}
            </View>
        )
    }

}

export default FriendsScreen;