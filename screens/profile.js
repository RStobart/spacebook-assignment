import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../components/post.js';

class ProfileScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            user_info : {},
            user_posts: [],
            own_profile: false,
            logged_user_id: ""
        };
        
        this.props.navigation.setOptions({ headerShown: false });
    }

    componentDidMount() {
        this.checkIfOwnProfile();
    }
    
    checkIfOwnProfile = async () => { 
        let ownId = await AsyncStorage.getItem("@user_id")
        this.setState({logged_user_id: ownId})
        if(ownId === this.props.route.params.userId){
            this.setState({own_profile: true});
            this.getUserDetails(ownId);
            this.getUserPosts(ownId);
        }
        else{
            this.getUserDetails(this.props.route.params.userId);
            this.getUserPosts(this.props.route.params.userId);
        }
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
        .then(async (user_info) => {
            this.setState({user_info});
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
                <Post key={keyNum} post={thisPost} logged_user_id={this.state.logged_user_id} navigation={this.props.navigation} />
            );
            keyNum++;
        });

        return(
            <View>
                <Text>Name: {this.state.user_info.first_name} {this.state.user_info.last_name}</Text>
                <Text>Friends: </Text>
                <Text>Posts: </Text>
                {postList}
            </View>
        )
    }
}

export default ProfileScreen;