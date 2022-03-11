import { Component } from "react/cjs/react.production.min";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from "../screens/profile.js";
import EditPostScreen from "../screens/editpost.js";
import style from '../style/style.js';

class ProfileNavScreen extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const stack = createNativeStackNavigator();

        return (
            <stack.Navigator initialRouteName="Profile">
                <stack.Screen name="Profile" component={ProfileScreen} options={{ headerStyle: style.headerStyle }} initialParams={{ userId: this.props.route.params.userId }} />
                <stack.Screen name="EditPost" component={EditPostScreen} options={{ headerStyle: style.headerStyle }} />
            </stack.Navigator>
        )
    }
}

export default ProfileNavScreen;