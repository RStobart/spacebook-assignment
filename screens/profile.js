import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../components/post.js';

class ProfileScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            logged_user_info : {},
            user_posts: []
        };

        this.getUserDetails();
        this.getUserPosts();
    }
    
    getUserDetails = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        let userId = await AsyncStorage.getItem("@user_id");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId, {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
            }
        })
        .then(async (logged_user_info) => {
            this.setState({logged_user_info});
        })
    }

    getUserPosts = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        let userId = await AsyncStorage.getItem("@user_id");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post", {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
            }
        })
        .then(async (user_posts) => {
            this.setState({user_posts});
        })
    }

    render(){

        let postList = [];

        this.state.user_posts.forEach((thisPost) => {
            postList.push(
                <Post post={thisPost} />
            );
        });

        return(
            <View>
                <Text>Name: {this.state.logged_user_info.first_name} {this.state.logged_user_info.last_name}</Text>
                <Text>Friends: </Text>
                <Text>Posts: </Text>
                {postList}
            </View>
        )
    }
}

export default ProfileScreen;