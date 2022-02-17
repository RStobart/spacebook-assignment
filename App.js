import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login.js';
import SignupScreen from './screens/signup.js';
import TestScreen from './screens/test.js';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="butts" component={TestScreen} />
        <stack.Screen name="Signup" component={SignupScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
