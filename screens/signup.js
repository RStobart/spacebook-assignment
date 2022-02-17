import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignupScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email : "",
            password : ""
        }
    }

    login = async () => {
        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 201){
                return response.json()
            }else if(response.status === 400){
                //Invalid email or password
            }else{
                //500
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
            </View>
        )
    }

}

export default SignupScreen;