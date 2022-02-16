import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { Button } from "react-native-web";

class Post extends Component{
    constructor(props){
        super(props);

        this.state = {
            liked: "like"
        }
    }

    like = async () => {
        let postId = this.props.post.post_id;
        let userId = this.props.post.author.user_id;
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post/" + postId + "/like", {
            method: 'POST',
            headers: {
                'X-Authorization': userToken
            }
        })
        .then((response) => {
            if(response.status === 200){
                return this.setState({
                    liked: "unlike"
                });//need to adapt for unliking
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
            }
        })
    }

    
    unlike = async () => {
        let postId = this.props.post.post_id;
        let userId = this.props.post.author.user_id;
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post/" + postId + "/like", {
            method: 'DELETE',
            headers: {
                'X-Authorization': userToken
            }
        })
        .then((response) => {
            if(response.status === 200){
                return this.setState({
                    liked: "like"
                });
            }else if(response.status === 401){
                //Unauthorised
            }else if(response.status === 404){
                //User not found, fucked
            }else{
                //500
            }
        })
    }

    render(){
        return(
            <View>
                <Text>{this.props.post.author.first_name} {this.props.post.author.last_name} wrote:</Text>
                <Text>{this.props.post.text}</Text>
                <Text>{this.props.post.timestamp}</Text>
                <Button onPress={() => this.like()} title={this.state.liked}/>
            </View>
        )
    }
}

export default Post;