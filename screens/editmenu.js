import { TouchableOpacity } from "react-native-web";
import { View, Text } from "react-native";
import { Component } from "react/cjs/react.production.min";
import style from '../style/style.js';

class EditMenuScreen extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={style.editprofile_view}>
                <TouchableOpacity style={style.editprofile_button} accessible={true} accessibilityLabel="Update name" accessibilityHint="Takes you to a page to edit your name" onPress={() => this.props.navigation.navigate("EditName")}>
                    <Text>EDIT NAME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.editprofile_button} accessible={true} accessibilityLabel="Update email" accessibilityHint="Takes you to a page to edit your email" onPress={() => this.props.navigation.navigate("EditEmail")}>
                    <Text>EDIT EMAIL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.editprofile_button} accessible={true} accessibilityLabel="Update password" accessibilityHint="Takes you to a page to edit your password" onPress={() => this.props.navigation.navigate("EditPassword")}>
                    <Text>EDIT PASSWORD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.editprofile_button} accessible={true} accessibilityLabel="Update photo" accessibilityHint="Takes you to a page to edit your profile photo" onPress={() => this.props.navigation.navigate("EditPhoto")}>
                    <Text>EDIT PHOTO</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default EditMenuScreen;