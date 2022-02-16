import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/login.js'
import ProfileScreen from './screens/profile.js'
import TestScreen from './screens/test.js'
import LogoutScreen from './screens/logout.js'

const drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <drawer.Navigator initialRouteName="Login">
        <drawer.Screen name="Login" component={LoginScreen} />
        <drawer.Screen name="Profile" component={ProfileScreen} />
        <drawer.Screen name="butts" component={TestScreen} />
        <drawer.Screen name="Logout" component={LogoutScreen} />
      </drawer.Navigator>
    </NavigationContainer>
  );
}
