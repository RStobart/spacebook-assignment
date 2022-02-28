import { Component } from "react/cjs/react.production.min";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Friend extends Component{
    constructor(props){
        super(props);

        this.state = {
            user_photo: ""
        }
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
                <Image source={{uri: this.state.user_photo}} style={{width: 100, height: 100}}/>
                <Text>{this.props.user.user_givenname} {this.props.user.user_familyname}</Text>
            </View>
        )
    }
}

export default Friend;