import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FriendRequest from '../components/friendrequest.js';

class FriendReqScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            potential_friends: []
        };

        this.getUserFriendRequests();
    }
    
    getUserFriendRequests = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/", {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
                //Unauthorised
            }else{
                //500
            }
        })
        .then(async (potential_friends) => {
            this.setState({potential_friends});
        })
    }

    render(){//need to figure out how to unrender requests that ahve been accepted or rejected

        let requestList = [];
        let keyNum = 0;

        this.state.potential_friends.forEach((thisUser) => {
            requestList.push(
                <FriendRequest key={keyNum} user={thisUser} />
            );
            keyNum++;
        });

        if(requestList.length === 0){
            return(
                <View>
                    <Text>Noone wants to be your friend atm :(</Text>
                </View>
            )
        }
        else{
            return(
                <View>
                    {requestList}
                </View>
            )
        }
    }
}

export default FriendReqScreen;