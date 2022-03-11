import { Component } from "react/cjs/react.production.min";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditMenuScreen from '../screens/editmenu.js';
import EditNameScreen from '../screens/editname.js';
import EditEmailScreen from '../screens/editemail.js';
import EditPasswordScreen from '../screens/editpassword.js';
import EditPhotoScreen from '../screens/editphoto.js';
import style from '../style/style.js';

class EditDetailsScreen extends Component{

    constructor(props){
        super(props);
    }

    
    render(){
        const stack = createNativeStackNavigator();

        return(
            <stack.Navigator initialRouteName="EditMenu">
                <stack.Screen name="EditMenu" component={EditMenuScreen} options={{ headerStyle: style.headerStyle }} />
                <stack.Screen name="EditName" component={EditNameScreen} options={{ headerStyle: style.headerStyle }} />
                <stack.Screen name="EditEmail" component={EditEmailScreen} options={{ headerStyle: style.headerStyle }} />
                <stack.Screen name="EditPassword" component={EditPasswordScreen} options={{ headerStyle: style.headerStyle }} />
                <stack.Screen name="EditPhoto" component={EditPhotoScreen} options={{ headerStyle: style.headerStyle }} />
            </stack.Navigator>
        )
    }
}

export default EditDetailsScreen;