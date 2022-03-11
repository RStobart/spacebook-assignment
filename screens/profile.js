import { Component } from "react/cjs/react.production.min";
import { ScrollView, Text, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from '../components/post.js';
import { Restart } from "fiction-expo-restart";
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style.js';

class ProfileScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            user_info : {},
            user_posts: [],
            user_photo: "",
            own_profile: false,
            logged_user_id: "",
            showAlert: false,
            alertText: ""
        };
        
        this.props.navigation.setOptions({ headerShown: false });
    }

    componentDidMount() {
        this.checkIfOwnProfile();
    }

    
    checkIfOwnProfile = async () => { 
        let ownId = await AsyncStorage.getItem("@user_id")
        this.setState({logged_user_id: ownId})
        if(ownId == this.props.route.params.userId){
            this.setState({own_profile: true});
            this.loadDetailsAndPosts(ownId);
        }
        else{
            this.loadDetailsAndPosts(this.props.route.params.userId);
        }
    }
    
    getUserDetails = async (userId) => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId, {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            this.removeLoginDetails();
            this.props.navigation.navigate("Login")
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
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
                    alertText: "Details not found, user does not exist"
                 });
            }else{//500
                this.setState({
                    showAlert: true,
                    alertText: "Something went wrong, try again later"
                 });
            }
        })
        .then(async (user_info) => {
            this.setState({user_info});
        }).then(async ()=>{
            this.props.navigation.addListener('focus', () => this.loadDetailsAndPosts(this.state.user_info.user_id));            
        });
    }

    getUserPosts = async (userId) => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post", {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            this.removeLoginDetails();
            this.props.navigation.navigate("Login")
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
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
                    alertText: "You cannot view this users posts"
                 });
            }else if(response.status === 404){
                this.setState({
                    showAlert: true,
                    alertText: "Posts not found, user does not exist"
                 });
            }else{
                this.setState({
                    showAlert: true,
                    alertText: "Something went wrong, try again later"
                 });
            }
        })
        .then(async (user_posts) => {
            this.setState({user_posts});
        })
    }

    getUserPhoto = async (userId) => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/photo", {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            this.removeLoginDetails();
            this.props.navigation.navigate("Login");
        }).then((response) => {
            if(response.status === 200){
                return response.blob();
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
                    alertText: "Photo not found, user does not exist"
                 });
            }else{
                this.setState({
                    showAlert: true,
                    alertText: "Something went wrong, try again later"
                 });
            }
        })
        .then(async (responseBlob) => {
            let photoData = URL.createObjectURL(responseBlob);
            this.setState({user_photo: photoData});
        })
    }

    removeLoginDetails = async () => {
        await AsyncStorage.removeItem("@user_id");
        await AsyncStorage.removeItem("@session_token");
    }

    loadDetailsAndPosts = async (userId) => {
        this.getUserDetails(userId);
        this.getUserPosts(userId);
        this.getUserPhoto(userId);
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

        let friendsText = "friends";

        if(this.state.user_info.friend_count == 1){
            friendsText = "friend";
        }

        if(!this.state.own_profile){
            return(
                <ScrollView>
                    <View style={style.profile_view}>
                        <Image style={style.profile_image} source={{uri: this.state.user_photo}}/>
                        <View>
                            <Text style={style.profile_text}>{this.state.user_info.first_name} {this.state.user_info.last_name}</Text>
                            <Text style={style.profile_text}>{this.state.user_info.friend_count} {friendsText}</Text>
                        </View>
                        <TouchableOpacity style={style.friendprofile_returnbutton} accessible={true} accessibilityLabel="Go back" accessibilityHint="Return to your friends list" onPress={() => this.props.navigation.goBack()}>
                            <Text>GO BACK</Text>
                        </TouchableOpacity>
                    </View>
                    {postList}

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
                </ScrollView>
            )
        } else {
            return(
                <ScrollView>
                    <View style={style.profile_view}>
                        <Image style={style.profile_image} source={{uri: this.state.user_photo}}/>
                        <View>
                            <Text style={style.profile_text}>{this.state.user_info.first_name} {this.state.user_info.last_name}</Text>
                            <Text style={style.profile_text}>{this.state.user_info.friend_count} friends</Text>
                        </View>
                    </View>
                    {postList}

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
                </ScrollView>
            )
        }
    }
}

export default ProfileScreen;