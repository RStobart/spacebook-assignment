import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            email : "",
            password : ""
        }
    }

    login = async () => {
        return fetch("http://localhost:3333/api/1.0.0/login", {//test@email.com beefboy
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 400){
                //Invalid email or password
            }else{
                //500
            }
        })
        .then(async (responseJson) => {
            await AsyncStorage.setItem('@user_id', responseJson.id)
            await AsyncStorage.setItem('@session_token', responseJson.token);
            this.props.navigation.navigate("butts");
        })
    }

    render(){
        return(
            <View>
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.email} onChangeText={(email) => this.setState({email})} />
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry />
                <Button onPress={() => this.login()} title="Login" />
            </View>
        )
    }

}

export default LoginScreen;