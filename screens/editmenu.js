import { TouchableOpacity } from 'react-native-web';
import React, { View, Text } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import style from '../style/style';

class EditMenuScreen extends Component {
  constructor(props) {
    super(props);

    this.props.navigation.setOptions({ headerShown: false });
  }

  render() {
    return (
      <View style={style.editprofile_view}>
        <TouchableOpacity style={style.editprofile_button} accessible accessibilityLabel="Update name" accessibilityHint="Takes you to a page to edit your name" onPress={() => this.props.navigation.navigate('EditName')}>
          <Text>EDIT NAME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.editprofile_button} accessible accessibilityLabel="Update email" accessibilityHint="Takes you to a page to edit your email" onPress={() => this.props.navigation.navigate('EditEmail')}>
          <Text>EDIT EMAIL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.editprofile_button} accessible accessibilityLabel="Update password" accessibilityHint="Takes you to a page to edit your password" onPress={() => this.props.navigation.navigate('EditPassword')}>
          <Text>EDIT PASSWORD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.editprofile_button} accessible accessibilityLabel="Update photo" accessibilityHint="Takes you to a page to edit your profile photo" onPress={() => this.props.navigation.navigate('EditPhoto')}>
          <Text>EDIT PHOTO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditMenuScreen;
