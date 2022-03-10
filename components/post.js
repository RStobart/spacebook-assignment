import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            alertText: ""
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
                    text: "Login session lost, please log in again"
                });
                Restart();
                } else if (response.status === 403) {
                    this.setState({
                        showAlert: true,
                        text: "You have already liked this post"
                    });
                } else if (response.status === 404) {
                    this.setState({
                        showAlert: true,
                        text: "Post no longer exists so you can't like it"
                     });
                } else {//500
                    this.setState({
                        showAlert: true,
                        text: "Something went wrong, try again later"
                     });
                }
            })
    }

    like = async () => {
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
                } else if (response.status === 401) {
                    this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        text: "Login session lost, please log in again"
                    });
                    Restart();
                } else if (response.status === 403) {
                    this.setState({
                        showAlert: true,
                        text: "You haven't liked this post"
                    });
                } else if (response.status === 404) {
                    this.setState({
                        showAlert: true,
                        text: "Post no longer exists so you can't unlike it"
                     });
                } else {//500
                    this.setState({
                        showAlert: true,
                        text: "Something went wrong, try again later"
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
                    this.setState({
                        showAlert: true,
                        text: "Deleted post!"
                    });
                } else if (response.status === 401) {
                    this.removeLoginDetails();
                    this.setState({
                        showAlert: true,
                        text: "Login session lost, please log in again"
                    });
                    Restart();
                } else if (response.status === 403) {
                    this.setState({
                        showAlert: true,
                        text: "You cannot delete other users posts"
                    });
                } else if (response.status === 404) {
                    this.setState({
                        showAlert: true,
                        text: "Unable to delete, post not found"
                    });
                } else {//500
                    this.setState({
                        showAlert: true,
                        text: "Something went wrong, try again later"
                     });
                }
            })
    }

    render() {

        if (this.props.logged_user_id == this.props.post.author.user_id) {
            return (
                <View>
                    <Text>{this.props.post.author.first_name} {this.props.post.author.last_name} wrote:</Text>
                    <Text>{this.props.post.text}</Text>
                    <Text>{this.props.post.timestamp}</Text>
                    <Button onPress={() => this.like()} title="Like" />
                    <Button onPress={() => this.props.navigation.navigate("EditPost", { post: this.props.post })} title="Edit post" />
                    <Button onPress={() => this.delete()} title="Delete post" />

                    <AwesomeAlert
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
                <View>
                    <Text>{this.props.post.author.first_name} {this.props.post.author.last_name} wrote:</Text>
                    <Text>{this.props.post.text}</Text>
                    <Text>{this.props.post.timestamp}</Text>
                    <Button onPress={() => this.like()} title="Like" />

                    <AwesomeAlert
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