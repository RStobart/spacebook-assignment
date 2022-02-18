import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';

class FriendRequest extends Component{
    constructor(props){
        super(props);

        this.state = {
            friend: false
        }
    }

    accept = async () => {
        let userId = this.props.user.user_id;
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + userId, {
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
        let userId = this.props.user.user_id;
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + userId, {
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
                <Text>{this.props.user.first_name} {this.props.user.last_name} wants to be friends</Text>
                <Button onPress={() => this.accept()} title="Accept"/>
                <Button onPress={() => this.reject()} title="Reject"/>

            </View>
        )
    }
}

export default FriendRequest;