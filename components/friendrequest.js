import { Component } from "react/cjs/react.production.min";
import { View } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Friend from "./friend";
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class FriendRequest extends Component{
    constructor(props){
        super(props);

        this.state = {
            hide: false,
            user_photo: "",
            showAlert: false,
            alertText: ""
        }
    }

    accept = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + this.props.user.user_id, {
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
                    alertText: this.props.user.user_givenname + " " + this.props.user.user_familyname + " is now your friend"
                });
                return this.setState({
                    hide: true
                });
            }else if(response.status === 401){
                this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        alertText: "Login session lost, please log in again"
                    });
                    Restart();
            }else if(response.status === 404){
                this.setState({
                    showAlert: true,
                    alertText: "Request not found, cannot add as friend"
                });
            }else{//500
                this.setState({
                    showAlert: true,
                    alertText: "Something went wrong, try again later"
                 });
            }
        })
    }

    reject = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + this.props.user.user_id, {
            method: 'DELETE',
            headers: {
                'X-Authorization': userToken
            }
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({
                    showAlert: true,
                    alertText: "Freind request from " + this.props.user.user_givenname + " " + this.props.user.user_familyname + " rejected"
                });
                return this.setState({
                    hide: true
                });
            }else if(response.status === 401){
                this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        alertText: "Login session lost, please log in again"
                    });
                    Restart();
            }else if(response.status === 404){
                this.setState({
                    showAlert: true,
                    alertText: "Request not found, cannot reject as friend"
                });
            }else{//500
                this.setState({
                    showAlert: true,
                    alertText: "Something went wrong, try again later"
                 });
            }
        })
    }

    render(){
        if(!this.state.hide){
            return(
                <View>

                    <Friend user={this.props.user}/>
                    <Button onPress={() => this.accept()} title="Accept"/>
                    <Button onPress={() => this.reject()} title="Reject"/>

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
        }else{
            return (
                <View />
            )
        }
    }
}

export default FriendRequest;