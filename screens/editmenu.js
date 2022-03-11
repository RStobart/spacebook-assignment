import { Button } from "react-native-web";
import { View } from "react-native";
import { Component } from "react/cjs/react.production.min";

class EditMenuScreen extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Button accessible={true} accessibilityLabel="Update name" accessibilityHint="Takes you to a page to edit your name" onPress={() => this.props.navigation.navigate("EditName")} title="Edit name"/>
                <Button accessible={true} accessibilityLabel="Update email" accessibilityHint="Takes you to a page to edit your email" onPress={() => this.props.navigation.navigate("EditEmail")} title="Edit email"/>
                <Button accessible={true} accessibilityLabel="Update password" accessibilityHint="Takes you to a page to edit your password" onPress={() => this.props.navigation.navigate("EditPassword")} title="Edit password"/>
                <Button accessible={true} accessibilityLabel="Update photo" accessibilityHint="Takes you to a page to edit your profile photo" onPress={() => this.props.navigation.navigate("EditPhoto")} title="Edit photo"/>
            </View>
        )
    }

}

export default EditMenuScreen;