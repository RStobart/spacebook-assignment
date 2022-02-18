import { Component } from "react/cjs/react.production.min";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './profile.js';
import LogoutScreen from './logout.js';
import SearchScreen from './search.js';
import FriendReqScreen from './friendreqs.js';
import FriendsScreen from './friends.js';

class TestScreen extends Component{
    constructor(props){
        super(props);

        this.props.navigation.setOptions({ headerShown: false });
    }

    render(){
        const drawer = createDrawerNavigator();

        return(
                <drawer.Navigator initialRouteName="Profile">
                    <drawer.Screen name="Profile" component={ProfileScreen} />
                    <drawer.Screen name="Friends" component={FriendsScreen} />
                    <drawer.Screen name="Search" component={SearchScreen} />
                    <drawer.Screen name="Friend Requests" component={FriendReqScreen} />
                    <drawer.Screen name="Logout" component={LogoutScreen} />
                </drawer.Navigator>
        )
    }
}

export default TestScreen;