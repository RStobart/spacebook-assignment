import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showAlert: false,
            alertText: ""
        }

    }

    checkForLogin = async () => {
        let potentialToken = await AsyncStorage.getItem("@session_token");
        let potentialId = await AsyncStorage.getItem("@user_id");
        if (potentialToken != null && potentialId != null) {
            this.props.navigation.navigate("butts", { userId: potentialId });
        }
    }

    login = async () => {
        return fetch("http://localhost:3333/api/1.0.0/login", {//test@email.com beefboy
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 400) {
                    this.setState({
                        email: "",
                        password: "",
                        showAlert: true,
                        alertText: "Invalid email or password"
                    });
                } else {//500
                    this.setState({
                        showAlert: true,
                        alertText: "Something went wrong, try again later"
                     });
                }
            })
            .then(async (responseJson) => {
                await AsyncStorage.setItem('@user_id', responseJson.id);
                await AsyncStorage.setItem('@session_token', responseJson.token);
                this.props.navigation.navigate("butts", { userId: responseJson.id });
            })
    }

    render() {
        this.checkForLogin();

        return (
            <View>
                <TextInput accessible={true} accessibilityLabel="Email field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                <TextInput accessible={true} accessibilityLabel="Password field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.password} onChangeText={(password) => this.setState({ password })} secureTextEntry />
                <Button accessible={true} accessibilityLabel="Log in" onPress={() => this.login()} title="Login" />
                <Button accessible={true} accessibilityLabel="Sign up and create and account" onPress={() => this.props.navigation.navigate("Signup")} title="Dont have an account?" />

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

export default LoginScreen;