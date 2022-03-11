import { Button } from "react-native-web";
import { View, Text } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-gesture-handler";
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class EditPostScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            text: this.props.route.params.post.text,
            showAlert: false,
            alertText: ""
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
            body: JSON.stringify({text: this.state.text})
        }).catch((err) => {
            console.log(err);
            Restart();
        })
        .then((response) => {
            if(response.status === 200){
                this.props.navigation.goBack();
            }else if(response.status === 400){
                this.setState({
                    showAlert: true,
                    alertText: "Unable to update post due to bad data"
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
                    alertText: "You cannot update another users posts"
                 });
            }else if(response.status === 404){
                this.setState({
                    showAlert: true,
                    alertText: "Post missing, unable to update"
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
                <Text>Edit the post below</Text>
                <TextInput accessible={true} accessibilityLabel="Post text field" style={{padding:5, borderWidth:1, margin:5}} value={this.state.text} onChangeText={(text) => this.setState({text})} />
                <Button accessible={true} accessibilityLabel="Done" accessibilityHint="Finish editing the post" onPress={() => this.edit()} title="Done"/>

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

export default EditPostScreen;