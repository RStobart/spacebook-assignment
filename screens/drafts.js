import { Component } from 'react/cjs/react.production.min';
import React, { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Draft from '../components/draft';

class DraftsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drafts: [],
    };

    this.props.navigation.setOptions({ headerShown: false });
  }

  componentDidMount() {
    this.getUserDrafts();
    this.props.navigation.addListener('focus', () => this.getUserDrafts());
  }

  getUserDrafts = async () => {
    const userId = await AsyncStorage.getItem('@user_id');
    const userDrafts = await AsyncStorage.getItem(`@drafts${userId}`);
    await this.setState({ drafts: JSON.parse(userDrafts) });
  };

  render() {
    const draftList = [];
    let keyNum = 0;

    if (this.state.drafts === null || this.state.drafts.length === 0) {
      return (
        <View>
          <Text>You do not have any saved drafts at the moment</Text>
        </View>
      );
    }

    this.state.drafts.forEach((thisDraft) => {
      draftList.push(
        <Draft navigation={this.props.navigation} key={keyNum} draft={thisDraft} />,
      );
      keyNum++;
    });
    return (
      <ScrollView>
        {draftList}
      </ScrollView>
    );
  }
}

export default DraftsScreen;
