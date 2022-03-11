import { Component } from "react/cjs/react.production.min";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileNavScreen from '../navigators/profilepostnav.js';
import LogoutScreen from '../screens/logout.js';
import SearchScreen from '../screens/search.js';
import FriendReqScreen from '../screens/friendreqs.js';
import FriendsNavScreen from '../navigators/friendsprofilenav.js';
import EditDetailsScreen from "./editdetails.js";
import CreatePostScreen from "../screens/postcreation.js";
import DraftsNavScreen from "./draftsnav.js";

class TestScreen extends Component {
    constructor(props) {
        super(props);

        this.props.navigation.setOptions({ headerShown: false });
    }

    render() {
        const drawer = createDrawerNavigator();

        return (
            <drawer.Navigator initialRouteName="ProfileNav">
                <drawer.Screen name="ProfileNav" component={ProfileNavScreen} options={{ title: "Profile" }} initialParams={{ userId: this.props.route.params.userId }} />
                <drawer.Screen name="Create Post" component={CreatePostScreen} />
                <drawer.Screen name="Draft posts" component={DraftsNavScreen} />
                <drawer.Screen name="Friends" component={FriendsNavScreen} />
                <drawer.Screen name="Search" component={SearchScreen} />
                <drawer.Screen name="Friend Requests" component={FriendReqScreen} />
                <drawer.Screen name="Edit profile" component={EditDetailsScreen} />
                <drawer.Screen name="Logout" component={LogoutScreen} />
            </drawer.Navigator>
        )
    }
}

export default TestScreen;