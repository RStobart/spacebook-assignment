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
                <Button onPress={() => this.props.navigation.navigate("EditName")} title="Edit name"/>
                <Button onPress={() => this.props.navigation.navigate("EditEmail")} title="Edit email"/>
                <Button onPress={() => this.props.navigation.navigate("EditPassword")} title="Edit password"/>
                <Button onPress={() => this.props.navigation.navigate("EditPhoto")} title="Edit photo"/>
            </View>
        )
    }

}

export default EditMenuScreen;