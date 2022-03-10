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
            unauthedAlert: false,
            forbiddenAlert: false,
            notFoundAlert: false,
            errorAlert: false
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

                } else if (response.status === 401) {
                    this.setState({
                        unauthedAlert: true 
                     });
                } else if (response.status === 403) {
                    this.setState({
                       forbiddenAlert: true 
                    });
                } else if (response.status === 404) {
                    this.setState({
                        notFoundAlert: true 
                     });
                } else {
                    this.setState({
                        errorAlert: true 
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
                    //YAY,DELETED
                } else if (response.status === 401) {
                    //Unauthorised
                } else if (response.status === 404) {
                    //User not found, fucked
                } else {
                    //500
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
                        show={this.state.forbiddenAlert}
                        message="You cannot like this post"
                        showConfirmButton={true}
                        confirmText="OK"
                        onConfirmPressed={() => {
                            this.setState({
                                forbiddenAlert: false 
                             });
                        }}
                    />

                    <AwesomeAlert
                        show={this.state.unauthedAlert}
                        message="Login session lost, please log in again"
                        showConfirmButton={true}
                        confirmText="OK"
                        onConfirmPressed={() => {
                            Restart();
                        }}
                    />

                    <AwesomeAlert
                        show={this.state.notFoundAlert}
                        message="Unable to like, post no longer exists"
                        showConfirmButton={true}
                        confirmText="OK"
                        onConfirmPressed={() => {
                            this.setState({
                                notFoundAlert: false 
                             });
                        }}
                    />

                    <AwesomeAlert
                        show={this.state.errorAlert}
                        message="Something went wrong, try again later"
                        showConfirmButton={true}
                        confirmText="OK"
                        onConfirmPressed={() => {
                            this.setState({
                                errorAlert: false 
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
                </View>
            )
        }
    }
}

export default Post;