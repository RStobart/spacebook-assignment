import { Component } from "react/cjs/react.production.min";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/profile.js';
import LogoutScreen from '../screens/logout.js';
import SearchScreen from '../screens/search.js';
import FriendReqScreen from '../screens/friendreqs.js';
import FriendsScreen from '../screens/friends.js';
import EditDetailsScreen from "./editdetails.js";

class TestScreen extends Component{
    constructor(props){
        super(props);

        this.props.navigation.setOptions({ headerShown: false });
    }

    render(){
        const drawer = createDrawerNavigator();

        return(
                <drawer.Navigator initialRouteName="Profile">
                    <drawer.Screen name="Profile" component={ProfileScreen} initialParams={{userId: this.props.route.params.userId}}/>
                    <drawer.Screen name="Friends" component={FriendsScreen} />
                    <drawer.Screen name="Search" component={SearchScreen} />
                    <drawer.Screen name="Friend Requests" component={FriendReqScreen} />
                    <drawer.Screen name="Edit profile" component={EditDetailsScreen} />
                    <drawer.Screen name="Logout" component={LogoutScreen} />
                </drawer.Navigator>
        )
    }
}

export default TestScreen;