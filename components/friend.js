import { Component } from "react/cjs/react.production.min";
import { View, Text, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class Friend extends Component{
    constructor(props){
        super(props);

        this.state = {
            user_photo: "",
            showAlert: false,
            alertText: ""
        }
    }

    getUserPhoto = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.user.user_id + "/photo", {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            Restart();
        })
        .then((response) => {
            if(response.status === 200){
                return response.blob();
            }else if(response.status === 401){
                this.removeLoginDetails();
                this.setState({
                    showAlert: true,
                    text: "Login session lost, please log in again"
                });
                Restart();
            }else if(response.status === 404){
                this.setState({
                    showAlert: true,
                    text: "Photo not found, user does not exist"
                 });
            }else{//500
                this.setState({
                    showAlert: true,
                    text: "Something went wrong, try again later"
                 });
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

export default Friend;