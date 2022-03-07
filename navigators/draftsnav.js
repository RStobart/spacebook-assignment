import { Component } from "react/cjs/react.production.min";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DraftsScreen from "../screens/drafts.js";
import ManageDraftScreen from "../screens/managedraft.js";

class DraftsNavScreen extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const stack = createNativeStackNavigator();

        return (
            <stack.Navigator initialRouteName="Drafts">
                <stack.Screen name="Drafts" component={DraftsScreen} />
                <stack.Screen name="ManageDraft" component={ManageDraftScreen} />
            </stack.Navigator>
        )
    }
}

export default DraftsNavScreen;