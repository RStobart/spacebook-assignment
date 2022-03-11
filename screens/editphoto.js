import { Component } from "react/cjs/react.production.min";
import { View } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class EditPhotoScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            photo : {},
            showAlert: false,
            alertText: ""
        };
    }
    
    updatePhoto = async (photo) => {
        let userToken = await AsyncStorage.getItem("@session_token");
        let userId = await AsyncStorage.getItem("@user_id");
        let photoRes = await fetch(photo.uri);
        let photoBlob = await photoRes.blob();
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/photo", {
            method: 'POST',
            headers: {
                'Content-Type': 'image/png',
                'X-Authorization': userToken
            },
            body: photoBlob
        }).catch((err) => {
            console.log(err);
            Restart();
        })
        .then((response) => {
            if(response.status === 200){
                //Hooray, updated
            }else if(response.status === 400){
                this.setState({
                    showAlert: true,
                    alertText: "Unable to update photo due to bad photo data"
                });
            }else if(response.status === 401){
                this.removeLoginDetails();
                this.setState({
                    showAlert: true,
                    alertText: "Login session lost, please log in again"
                });
                Restart();
            }else if(response.status === 404){
                this.setState({
                    showAlert: true,
                    alertText: "User missing, unable to update photo"
                 });
            }else{//500
                this.setState({
                    showAlert: true,
                    alertText: "Something went wrong, try again later"
                 });
            }
        })
    }

    choosePhoto = async () =>{
        let photo = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true
		});
        console.log(photo);
        if(!photo.cancelled){
            this.setState({photo});
            this.updatePhoto(photo);
        }
    }

    render(){
        return(
            <View>
                <Button accessible={true} accessibilityLabel="Choose new profile photo" onPress={() => this.choosePhoto()} title="Choose new profile photo" />

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

export default EditPhotoScreen;