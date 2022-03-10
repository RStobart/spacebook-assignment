import { Button } from "react-native-web";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class LogoutScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            showAlert: false,
            alertText: ""
        }
    }

    logout = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/logout", {
            method: 'POST',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            Restart();
        })
        .then(async (response) => {
            if(response.status === 200){
                await AsyncStorage.removeItem("@user_id");
                await AsyncStorage.removeItem("@session_token");
                this.props.navigation.navigate("Login");
            }else if(response.status === 401){
                this.removeLoginDetails();
                this.setState({
                    showAlert: true,
                    alertText: "Login session lost, please log in again"
                });
                Restart();
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
                <Button onPress={() => {this.logout()}} title="Logout" />
                <Button onPress={() => {this.props.navigation.navigate("butts")}} title="Stay logged in" />

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

export default LogoutScreen;