import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-web";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchResult from '../components/searchresult.js'
import {Restart} from 'fiction-expo-restart';

class SearchScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: "",
            search_results: []
        }
    }

    searchForUsers = async () => {
        let userToken = await AsyncStorage.getItem("@session_token");
        return fetch("http://localhost:3333/api/1.0.0/search?q=" + this.state.search, {
            method: 'GET',
            headers: {
                'X-Authorization': userToken
            },
        }).catch((err) => {
            console.log(err);
            Restart();
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 400){
                //Invalid search
            }else if(response.status === 401){
                //Unauthorized
            }else{
                //500
            }
        })
        .then(async (search_results) => {
            this.setState({search_results});
            this.render();
        })
    }
    
    render(){
        let searchResults =[];
        let keyNum = 0;

        this.state.search_results.forEach((thisResult) => {
            searchResults.push(
                <SearchResult key={keyNum} user={thisResult} />
            );
            keyNum++;
        });

        return(
            <View>
                <TextInput style={{padding:5, borderWidth:1, margin:5}} value={this.state.search} onChangeText={(search) => this.setState({search})}/>
                <Button onPress={() => this.searchForUsers()} title="Search"/>
                {searchResults}
            </View>
        )
    }

}

export default SearchScreen;