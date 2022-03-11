import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { Button } from "react-native-web";

class Draft extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>{this.props.draft.text}</Text>
                <Button accessible={true} accessibilityLabel="Manage draft" title="Manage draft" onPress={() => this.props.navigation.navigate("ManageDraft", { draft: this.props.draft })} />
            </View>
        )
    }
}

export default Draft;