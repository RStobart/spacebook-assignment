import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class SearchResult extends Component{
    constructor(props){
        super(props);

        this.state = {
            friend: "",
            showAlert: false,
            alertText: ""
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
                this.setState({
                    showAlert: true,
                    text: "Friend request sent!"
                 });
            }else if(response.status === 401){
                this.removeLoginDetails();
                this.setState({
                    showAlert: true,
                    text: "Login session lost, please log in again"
                });
                Restart();
            }else if(response.status === 403){
                this.setState({
                    showAlert: true,
                    text: "This user is already your friend"
                });
            }else if(response.status === 404){
                this.setState({
                    showAlert: true,
                    text: "User no longer exists so you can't add them as a friend"
                 });
            }else{//500
                this.setState({
                    showAlert: true,
                    text: "Something went wrong, try again later"
                 });
            }
        })
    }

    render(){
        return(
            <View>
                <Text>{this.props.user.user_givenname} {this.props.user.user_familyname}</Text>
                <Button onPress={() => this.sendFriendRequest()} title="Send friend request"/>

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

export default SearchResult;