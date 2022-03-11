import { Component } from 'react/cjs/react.production.min';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react-native';
import DraftsScreen from '../screens/drafts';
import ManageDraftScreen from '../screens/managedraft';
import style from '../style/style';

class DraftsNavScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const stack = createNativeStackNavigator();

    return (
      <stack.Navigator initialRouteName="Drafts">
        <stack.Screen name="Drafts" component={DraftsScreen} options={{ headerStyle: style.headerStyle }} />
        <stack.Screen name="ManageDraft" component={ManageDraftScreen} options={{ headerStyle: style.headerStyle }} />
      </stack.Navigator>
    );
  }
}

export default DraftsNavScreen;
