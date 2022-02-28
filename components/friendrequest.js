import { Component } from "react/cjs/react.production.min";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Friend from "./friend";

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

    getUserPhoto = async (userId) => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.user.user_id + "/photo", {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.blob();
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
            }
        })
        .then(async (responseBlob) => {
            let photoData = URL.createObjectURL(responseBlob);
            this.setState({user_photo: photoData});
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