import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class SignupScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email : "",
            password : "",
            showAlert: false,
            alertText: ""
        }
    }

    login = async () => {
        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).catch((err) => {
            console.log(err);
            Restart();
        })
        .then((response) => {
            if(response.status === 201){
                this.setState({
                    showAlert: true,
                    alertText: "Account successfully created"
                 });
                return response.json()
            }else if(response.status === 400){
                this.setState({
                    showAlert: true,
                    alertText: "Unable to create user due to bad data, please try again",
                    first_name: "",
                    last_name: "",
                    email : "",
                    password : ""
                 });
            }else{//500
                this.setState({
                    showAlert: true,
                    alertText: "Something went wrong, try again later"
                 });
            }
        })
        .then(async (responseJson) => {
            await AsyncStorage.setItem('@user_id', responseJson.id);
            this.props.navigation.navigate("Login");
        })
    }

    render(){
        return(
            <View>
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.first_name} onChangeText={(first_name) => this.setState({first_name})} />
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.last_name} onChangeText={(last_name) => this.setState({last_name})} />
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.email} onChangeText={(email) => this.setState({email})} />
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry />
                <Button onPress={() => this.login()} title="Create account" />

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

export default SignupScreen;