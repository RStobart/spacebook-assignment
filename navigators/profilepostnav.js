import { Component } from "react/cjs/react.production.min";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from "../screens/profile";
import EditPostScreen from "../screens/editpost";

class ProfileNavScreen extends Component{

    constructor(props){
        super(props);

    }

    
    render(){
        const stack = createNativeStackNavigator();

        return(
            <stack.Navigator initialRouteName="Profile">
                <stack.Screen name="Profile" component={ProfileScreen} initialParams={{userId: this.props.route.params.userId}} />
                <stack.Screen name="EditPost" component={EditPostScreen} />
            </stack.Navigator>
        )
    }
}

export default ProfileNavScreen;