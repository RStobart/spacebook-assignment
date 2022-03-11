import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import React, { View, Text } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from 'fiction-expo-restart';
import AwesomeAlert from 'react-native-awesome-alerts';
import SearchResult from '../components/searchresult';
import style from '../style/style';

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      searchResults: [],
      showAlert: false,
      alertText: '',
    };
  }

  searchForUsers = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch(`http://localhost:3333/api/1.0.0/search?q=${this.state.search}`, {
      method: 'GET',
      headers: {
        'X-Authorization': userToken,
      },
    }).catch((err) => {
      console.log(err);
      Restart();
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 400) {
          this.setState({
            showAlert: true,
            alertText: "Sorry, that search didn't work, please try another",
          });
        } else if (response.status === 401) {
          this.setState({
            showAlert: true,
            alertText: 'Login session lost, please log in again',
          });
          Restart();
        } else { // 500
          this.setState({
            showAlert: true,
            alertText: 'Something went wrong, try again later',
          });
        }
      })
      .then(async (searchResults) => {
        this.setState({ searchResults });
      });
  };

  render() {
    const searchResults = [];
    let keyNum = 0;

    this.state.searchResults.forEach((thisResult) => {
      searchResults.push(
        <SearchResult key={keyNum} user={thisResult} />,
      );
      keyNum++;
    });

    return (
      <View style={style.search_view}>
        <Text style={style.search_text}>Search for users</Text>
        <TextInput accessible accessibilityLabel="Friend name search field" style={{ padding: 5, borderWidth: 1, margin: 5 }} value={this.state.search} onChangeText={(search) => this.setState({ search })} />
        <TouchableOpacity style={style.search_button} accessible accessibilityLabel="Search" accessibilityHint="Search for users" onPress={() => this.searchForUsers()}>
          <Text>SEARCH</Text>
        </TouchableOpacity>
        {searchResults}

        <AwesomeAlert
          accessible
          accessibilityLabel={this.state.alertText}
          show={this.state.showAlert}
          message={this.state.alertText}
          showConfirmButton
          confirmText="OK"
          onConfirmPressed={() => {
            this.setState({
              showAlert: false,
            });
          }}
        />
      </View>
    );
  }
}

export default SearchScreen;
