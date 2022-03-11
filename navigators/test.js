import { Component } from 'react/cjs/react.production.min';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react-native';
import ProfileNavScreen from './profilepostnav';
import LogoutScreen from '../screens/logout';
import SearchScreen from '../screens/search';
import FriendReqScreen from '../screens/friendreqs';
import FriendsNavScreen from './friendsprofilenav';
import EditDetailsScreen from './editdetails';
import CreatePostScreen from '../screens/postcreation';
import DraftsNavScreen from './draftsnav';
import style from '../style/style';

class TestScreen extends Component {
  constructor(props) {
    super(props);

    this.props.navigation.setOptions({ headerShown: false });
  }

  render() {
    const drawer = createDrawerNavigator();

    return (
      <drawer.Navigator initialRouteName="ProfileNav">
        <drawer.Screen name="ProfileNav" component={ProfileNavScreen} options={{ title: 'Profile', headerStyle: style.headerStyle }} initialParams={{ userId: this.props.route.params.userId }} />
        <drawer.Screen name="Create Post" component={CreatePostScreen} options={{ headerStyle: style.headerStyle }} />
        <drawer.Screen name="Draft posts" component={DraftsNavScreen} options={{ headerStyle: style.headerStyle }} />
        <drawer.Screen name="Friends" component={FriendsNavScreen} options={{ headerStyle: style.headerStyle }} />
        <drawer.Screen name="Search" component={SearchScreen} options={{ headerStyle: style.headerStyle }} />
        <drawer.Screen name="Friend Requests" component={FriendReqScreen} options={{ headerStyle: style.headerStyle }} />
        <drawer.Screen name="Edit profile" component={EditDetailsScreen} options={{ headerStyle: style.headerStyle }} />
        <drawer.Screen name="Logout" component={LogoutScreen} options={{ headerStyle: style.headerStyle }} />
      </drawer.Navigator>
    );
  }
}

export default TestScreen;
