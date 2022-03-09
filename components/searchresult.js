import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';

class SearchResult extends Component{
    constructor(props){
        super(props);

        this.state = {
            friend: ""
        }
    }

    sendFriendRequest = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.user.user_id + "/friends/", {
            method: 'POST',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            Restart();
        })
        .then((response) => {
            if(response.status === 200){
                //Friend request sent
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 403){
                //Already friend
            }else if(response.status === 404){
                //User not found
            }else{
                //500
            }
        })
    }

    render(){
        return(
            <View>
                <Text>{this.props.user.user_givenname} {this.props.user.user_familyname}</Text>
                <Button onPress={() => this.sendFriendRequest()} title="Send friend request"/>
            </View>
        )
    }
}

export default SearchResult;