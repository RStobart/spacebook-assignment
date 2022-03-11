import { Component } from 'react/cjs/react.production.min';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react-native';
import EditMenuScreen from '../screens/editmenu';
import EditNameScreen from '../screens/editname';
import EditEmailScreen from '../screens/editemail';
import EditPasswordScreen from '../screens/editpassword';
import EditPhotoScreen from '../screens/editphoto';
import style from '../style/style';

class EditDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const stack = createNativeStackNavigator();

    return (
      <stack.Navigator initialRouteName="EditMenu">
        <stack.Screen name="EditMenu" component={EditMenuScreen} options={{ headerStyle: style.headerStyle }} />
        <stack.Screen name="EditName" component={EditNameScreen} options={{ headerStyle: style.headerStyle }} />
        <stack.Screen name="EditEmail" component={EditEmailScreen} options={{ headerStyle: style.headerStyle }} />
        <stack.Screen name="EditPassword" component={EditPasswordScreen} options={{ headerStyle: style.headerStyle }} />
        <stack.Screen name="EditPhoto" component={EditPhotoScreen} options={{ headerStyle: style.headerStyle }} />
      </stack.Navigator>
    );
  }
}

export default EditDetailsScreen;
