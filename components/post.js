import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style/style.js';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            alertText: "",
            hidden: false
        }

    }

    like = async () => {
        let postId = this.props.post.post_id;
        let userId = this.props.post.author.user_id;
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post/" + postId + "/like", {
            method: 'POST',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            Restart();
        })
            .then((response) => {
                if (response.status === 200) {
                    //Post liked
                } else if (response.status === 401) {
                    this.removeLoginDetails();
                this.setState({
                    showAlert: true,
                    alertText: "Login session lost, please log in again"
                });
                Restart();
                } else if (response.status === 403) {//Server continues to return 200s rather than 403s on persistent liking
                    if (this.props.logged_user_id == this.props.post.author.user_id){
                        this.setState({
                            showAlert: true,
                            alertText: "You can't like or unlike your own posts"
                        });
                    }else{
                        this.setState({
                            showAlert: true,
                            alertText: "You have already liked this post"
                        });
                    }
                } else if (response.status === 404) {
                    this.setState({
                        showAlert: true,
                        alertText: "Post no longer exists so you can't like it"
                     });
                } else {//500
                    this.setState({
                        showAlert: true,
                        alertText: "Something went wrong, try again later"
                     });
                }
            })
    }

    unlike = async () => {
        let postId = this.props.post.post_id;
        let userId = this.props.post.author.user_id;
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post/" + postId + "/like", {
            method: 'DELETE',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            Restart();
        })
            .then((response) => {
                if (response.status === 200) {
                    //Post unliked
                }else if (response.status === 400) {//Server returns 400 rather than 403
                    this.setState({
                        showAlert: true,
                        alertText: "You cant unlike a post youe haven't liked"
                     });
                } else if (response.status === 401) {
                    this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        alertText: "Login session lost, please log in again"
                    });
                    Restart();
                } else if (response.status === 403) {
                    if (this.props.logged_user_id == this.props.post.author.user_id){
                        this.setState({
                            showAlert: true,
                            alertText: "You can't like or unlike your own posts"
                        });
                    }else{
                        this.setState({
                            showAlert: true,
                            alertText: "You cant unlike a post youe haven't liked"
                        });
                    }
                } else if (response.status === 404) {
                    this.setState({
                        showAlert: true,
                        alertText: "Post no longer exists so you can't unlike it"
                     });
                } else {//500
                    this.setState({
                        showAlert: true,
                        alertText: "Something went wrong, try again later"
                     });
                }
            })
    }

    delete = async () => {
        let postId = this.props.post.post_id;
        let userId = this.props.post.author.user_id;
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post/" + postId, {
            method: 'DELETE',
            headers: {
                'X-Authorization': userToken
            }
        }).catch((err) => {
            console.log(err);
            Restart();
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({hidden: true});
                } else if (response.status === 401) {
                    this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        alertText: "Login session lost, please log in again"
                    });
                    Restart();
                } else if (response.status === 403) {
                    this.setState({
                        showAlert: true,
                        alertText: "You cannot delete other users posts"
                    });
                } else if (response.status === 404) {
                    this.setState({
                        showAlert: true,
                        alertText: "Unable to delete, post not found"
                    });
                } else {//500
                    this.setState({
                        showAlert: true,
                        alertText: "Something went wrong, try again later"
                     });
                }
            })
    }

    render() {
        let likeText = "Likes"
        if(this.props.post.numLikes == 1){
            likeText = "like"
        }

        let postTime = new Date(this.props.post.timestamp);

        if(this.state.hidden){
            return(<View />)
        }else if (this.props.logged_user_id == this.props.post.author.user_id) {
            return (
                <View style={style.post_view}>
                    <View style={style.inner_post}>
                        <Text>{this.props.post.author.first_name} {this.props.post.author.last_name} wrote:</Text>
                        <Text>{this.props.post.text}</Text>
                        <View style={style.post_likeview}>
                            <Text>{postTime.getHours()}:{postTime.getMinutes()} {postTime.getDay()}/{postTime.getMonth()}/{postTime.getFullYear()}</Text>
                            <Text>{this.props.post.numLikes} {likeText}</Text>
                        </View>
                        <View style={style.post_buttonview}>
                            <TouchableOpacity style={style.post_button} onPress={() => this.like()} >
                                <Text>LIKE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.post_button} onPress={() => this.unlike()} >
                                <Text>UNLIKE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.post_button} onPress={() => this.props.navigation.navigate("EditPost", { post: this.props.post })} >
                                <Text>EDIT POST</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.post_button} onPress={() => this.delete()} >
                                <Text>DELETE POST</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        else {
            return (
                <View style={style.post_view}>
                    <View style={style.inner_post}>
                        <Text>{this.props.post.author.first_name} {this.props.post.author.last_name} wrote:</Text>
                        <Text>{this.props.post.text}</Text>
                        <View style={style.post_likeview}>
                            <Text>{postTime.getHours()}:{postTime.getMinutes()} {postTime.getDay()}/{postTime.getMonth()}/{postTime.getFullYear()}</Text>
                            <Text>{this.props.post.numLikes} {likeText}</Text>
                        </View>
                        <View style={style.post_buttonview}>
                            <TouchableOpacity style={style.post_button} accessible={true} accessibilityLabel="Like" onPress={() => this.like()}><Text>LIKE</Text></TouchableOpacity>
                            <TouchableOpacity style={style.post_button} accessible={true} accessibilityLabel="Unlike" onPress={() => this.unlike()}><Text>UNLIKE</Text></TouchableOpacity>
                        </View>
                    </View>
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
}

export default Post;