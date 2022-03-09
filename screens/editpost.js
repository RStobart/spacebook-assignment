import { Button } from "react-native-web";
import { View, Text } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-gesture-handler";
import {Restart} from 'fiction-expo-restart';

class EditPostScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            text: this.props.route.params.post.text
        }
    }

    edit = async () => {
        let postId = this.props.route.params.post.post_id;
        let userId = this.props.route.params.post.author.user_id;
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post/" + postId, {
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
                this.props.navigation.goBack();
            }else if(response.status === 400){
                //Bad request
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 403){
                //Not your post
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
            }
        })
    }

    render(){
        return(//THIS IS GIVING 400 FOR SOME FUCKING REASON
            <View>
                <Text>Edit the post below</Text>
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.text} onChangeText={(text) => this.setState({text})} />
                <Button onPress={() => this.edit()} title="Done"/>
            </View>
        )
    }

}

export default EditPostScreen;