import { Component } from "react/cjs/react.production.min";
import { View } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {Restart} from 'fiction-expo-restart';

class EditPhotoScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            photo : {}
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
            body: photoBlob//data is a bit poo, find out why
        }).catch((err) => {
            console.log(err);
            Restart();
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
                <Button onPress={() => this.choosePhoto()} title="Choose new profile photo" />
            </View>
        )
    }
}

export default EditPhotoScreen;