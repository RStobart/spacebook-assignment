import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login.js';
import SignupScreen from './screens/signup.js';
import TestScreen from './navigators/test.js';
import style from './style/style.js';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Login" component={LoginScreen} options={{ headerStyle: style.headerStyle }}  />
        <stack.Screen name="butts" component={TestScreen} options={{ headerStyle: style.headerStyle }}  />
        <stack.Screen name="Signup" component={SignupScreen}  options={{ headerStyle: style.headerStyle }} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
