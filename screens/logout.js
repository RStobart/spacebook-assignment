import { Button } from "react-native-web";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';

class LogoutScreen extends Component {
    constructor(props){
        super(props);
    }

    logout = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/logout", {
            method: 'POST',
            headers: {
                'X-Authorization': userToken
            }
        })
        .then(async (response) => {
            if(response.status === 200){
                await AsyncStorage.removeItem("@user_id");
                await AsyncStorage.removeItem("@session_token");
                this.props.navigation.navigate("Login");
            }else if(response.status === 400){
                //Invalid email or password
            }else{
                //500
            }
        })
    }

    render(){
        return(
            <View>
                <Button onPress={() => {this.logout()}} title="actually fucking log out please let me leave oh god" />
                <Button onPress={() => {this.props.navigation.navigate("butts")}} title="lol no i stay" />
            </View>
        )
    }
}

export default LogoutScreen;