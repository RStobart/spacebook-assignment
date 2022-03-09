import { Component } from "react/cjs/react.production.min";
import { View } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Friend from "./friend";
import {Restart} from 'fiction-expo-restart';

class FriendRequest extends Component{
    constructor(props){
        super(props);

        this.state = {
            friend: false,
            user_photo: ""
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
                return this.setState({
                    friend: true
                });
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
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
                //Rejection, proceed to cry
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
            }
        })
    }

    render(){
        return(
            <View>

                <Friend user={this.props.user}/>
                <Button onPress={() => this.accept()} title="Accept"/>
                <Button onPress={() => this.reject()} title="Reject"/>

            </View>
        )
    }
}

export default FriendRequest;