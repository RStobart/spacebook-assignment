import { Component } from "react/cjs/react.production.min";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from "../screens/profile.js";
import FriendsScreen from "../screens/friends.js";
import style from '../style/style.js';

class FriendsNavScreen extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const stack = createNativeStackNavigator();

        return (
            <stack.Navigator initialRouteName="Friends">
                <stack.Screen name="FriendsList" component={FriendsScreen} options={{ headerStyle: style.headerStyle }} />
                <stack.Screen name="Profile" component={ProfileScreen} options={{ headerStyle: style.headerStyle }} />
            </stack.Navigator>
        )
    }
}

export default FriendsNavScreen;