import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class EditEmailScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            email : "",
            showAlert: false,
            alertText: ""
        };
    }
    
    updateEmail = async () => {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(!emailRegex.test(this.state.email)){
            this.setState({
                showAlert: true,
                alertText: "Invalid email"
             });
        }else{
            let userToken = await AsyncStorage.getItem("@session_token");
            let userId = await AsyncStorage.getItem("@user_id");
            return fetch("http://localhost:3333/api/1.0.0/user/" + userId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userToken
                },
                body: JSON.stringify(this.state)
            }).catch((err) => {
                console.log(err);
                Restart();
            })
            .then((response) => {
                if(response.status === 200){
                    this.setState({
                        showAlert: true,
                        alertText: "Email updated!"
                    });
                }else if(response.status === 400){
                    this.setState({
                        showAlert: true,
                        alertText: "Unable to update email due to bad data"
                    });
                }else if(response.status === 401){
                    this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        alertText: "Login session lost, please log in again"
                    });
                    Restart();
                }else if(response.status === 403){
                    this.setState({
                        showAlert: true,
                        alertText: "You cannot update another users email"
                    });
                }else if(response.status === 404){
                    this.setState({
                        showAlert: true,
                        alertText: "User missing, unable to update email"
                    });
                }else{//500
                    this.setState({
                        showAlert: true,
                        alertText: "Something went wrong, try again later"
                    });
                }
            })
        }
    }

    render(){

        return(
            <View>
                <Text>Enter new email:</Text>
                <TextInput accessible={true} accessibilityLabel="New email field" style={{padding:5, borderWidth:1, margin:5}} value={this.state.email} onChangeText={(email) => this.setState({email})} />
                <Button accessible={true} accessibilityLabel="Update Email" onPress={() => this.updateEmail()} title="Update email" />

                <AwesomeAlert accessible={true} accessibilityLabel={this.state.alertText}
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

export default EditEmailScreen;