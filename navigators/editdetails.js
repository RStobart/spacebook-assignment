import { Component } from "react/cjs/react.production.min";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditMenuScreen from '../screens/editmenu.js';
import EditNameScreen from '../screens/editname.js';
import EditEmailScreen from '../screens/editemail.js';
import EditPasswordScreen from '../screens/editpassword.js';
import EditPhotoScreen from '../screens/editphoto.js';

class EditDetailsScreen extends Component{

    constructor(props){
        super(props);
    }

    
    render(){
        const stack = createNativeStackNavigator();

        return(
            <stack.Navigator initialRouteName="EditMenu">
                <stack.Screen name="EditMenu" component={EditMenuScreen} />
                <stack.Screen name="EditName" component={EditNameScreen} />
                <stack.Screen name="EditEmail" component={EditEmailScreen} />
                <stack.Screen name="EditPassword" component={EditPasswordScreen} />
                <stack.Screen name="EditPhoto" component={EditPhotoScreen} />
            </stack.Navigator>
        )
    }
}

export default EditDetailsScreen;