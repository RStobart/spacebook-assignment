import { Component } from "react/cjs/react.production.min";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class EditNameScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            first_name : "",
            last_name: "",
            showAlert: false,
            alertText: ""
        };
    }
    
    updateName = async () => {
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
                    alertText: "Name updated!"
                });
            }else if(response.status === 400){
                this.setState({
                    showAlert: true,
                    alertText: "Unable to update name due to bad data"
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
                    alertText: "You cannot update another users name"
                 });
            }else if(response.status === 404){
                this.setState({
                    showAlert: true,
                    alertText: "User missing, unable to update name"
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

        return(
            <View>
                <TextInput accessible={true} accessibilityLabel="New first name field" style={{padding:5, borderWidth:1, margin:5}} value={this.state.first_name} onChangeText={(first_name) => this.setState({first_name})} />
                <TextInput accessible={true} accessibilityLabel="New last name field" style={{padding:5, borderWidth:1, margin:5}} value={this.state.last_name} onChangeText={(last_name) => this.setState({last_name})} />
                <Button accessible={true} accessibilityLabel="Update name" onPress={() => this.updateName()} title="Update name" />

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

export default EditNameScreen;