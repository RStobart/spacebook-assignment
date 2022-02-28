import { Component } from "react/cjs/react.production.min";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditEmailScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            email : ""
        };
    }
    
    updateEmail = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        let userId = await AsyncStorage.getItem("@user_id");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userToken
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 200){
                //Hooray, updated
            }else if(response.status === 400){
                //Bad req
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 403){
                //Forbidden, not you
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
            }
        })
    }

    render(){

        return(
            <View>
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.email} onChangeText={(email) => this.setState({email})} />
                <Button onPress={() => this.updateEmail()} />
            </View>
        )
    }
}

export default EditEmailScreen;