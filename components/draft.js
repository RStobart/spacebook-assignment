import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-web";
import style from '../style/style.js';

class Draft extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.draft_view}>
                <View style={style.inner_draft}>
                    <Text>Draft {this.props.draft.draftId}</Text>
                    <Text>{this.props.draft.text}</Text>
                    <TouchableOpacity style={style.draft_button} accessible={true} accessibilityLabel="Manage draft" onPress={() => this.props.navigation.navigate("ManageDraft", { draft: this.props.draft })}>
                        <Text>MANAGE DRAFT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Draft;