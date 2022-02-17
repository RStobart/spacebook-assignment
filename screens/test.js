import { Component } from "react/cjs/react.production.min";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './profile.js';
import LogoutScreen from './logout.js';

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
                    <drawer.Screen name="Logout" component={LogoutScreen} />
                </drawer.Navigator>
        )
    }
}

export default TestScreen;