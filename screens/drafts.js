import { Component } from "react/cjs/react.production.min";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Draft from '../components/draft.js';

class DraftsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drafts: []
        };

    }

    componentDidMount() {
        this.getUserDrafts();
    }

    getUserDrafts = async () => {
        let userId = await AsyncStorage.getItem("@user_id");
        let userDrafts = await AsyncStorage.getItem("@drafts" + userId);
        await this.setState({ drafts: JSON.parse(userDrafts) });
    }

    render() {

        let draftList = [];
        let keyNum = 0;

        console.log(this.state.drafts)

        this.state.drafts.forEach((thisDraft) => {
            console.log(thisDraft);
            draftList.push(
                <Draft navigation={this.props.navigation} key={keyNum} draft={thisDraft} />
            );
            keyNum++;
        });

        if (draftList.length === 0) {
            return (
                <View>
                    <Text>You do not have any saved drafts at the moment</Text>
                </View>
            )
        }
        else {
            return (
                <View>
                    {draftList}
                </View>
            )
        }
    }
}

export default DraftsScreen;