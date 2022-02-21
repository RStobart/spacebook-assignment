import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../components/post.js';

class ProfileScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            logged_user_info : {},
            user_posts: [],
            own_profile: false
        };
        
    }

    componentDidMount() {
        this.checkIfOwnProfile();
    }
    
    checkIfOwnProfile = async () => { 
        await AsyncStorage.getItem("@user_id").then((ownId) => {
            console.log(ownId);
            console.log(this.props.route.params.userId);
            if(ownId === this.props.route.params.userId){
                this.setState({own_profile: true});
                this.getUserDetails(ownId);
                this.getUserPosts(ownId);
            }
            else{
                this.getUserDetails(this.props.userId);
                this.getUserPosts(this.props.userId);
            }
        });
    }
    
    getUserDetails = async (userId) => {
        let userToken = await AsyncStorage.getItem("@session_token");
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

    getUserPosts = async (userId) => {
        let userToken = await AsyncStorage.getItem("@session_token");
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

    loadOwnDetailsAndPosts = async () => {
        let userId = await AsyncStorage.getItem("@user_id");
        this.getUserDetails(userId);
        this.getUserPosts(userId);
    }

    render(){

        let postList = [];
        let keyNum = 0;

        this.state.user_posts.forEach((thisPost) => {
            postList.push(
                <Post key={keyNum} post={thisPost} />
            );
            keyNum++;
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