import { Component } from "react/cjs/react.production.min";
import { View, Text, Alert } from "react-native";
import { Button } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            liked: "like",
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
                    return this.setState({
                        liked: "unlike"
                    });
                } else if (response.status === 401) {
                    //Unauthorised
                } else if (response.status === 404) {
                    //User not found, fucked
                } else {
                    //500
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
                    return this.setState({
                        liked: "like"
                    });
                } else if (response.status === 401) {
                    //Unauthorised
                } else if (response.status === 404) {
                    //User not found, fucked
                } else {
                    //500
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
                    <Button onPress={() => this.like()} title={this.state.liked} />
                    <Button onPress={() => this.props.navigation.navigate("EditPost", { post: this.props.post })} title="Edit post" />
                    <Button onPress={() => this.delete()} title="Delete post" />
                </View>
            )
        }
        else {
            return (
                <View>
                    <Text>{this.props.post.author.first_name} {this.props.post.author.last_name} wrote:</Text>
                    <Text>{this.props.post.text}</Text>
                    <Text>{this.props.post.timestamp}</Text>
                    <Button onPress={() => this.like()} title={this.state.liked} />
                </View>
            )
        }
    }
}

export default Post;