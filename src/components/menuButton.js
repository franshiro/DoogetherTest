import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {h, w, customFont} from './variable/dimension'

const MenuButton = ({name, route, navigation}, ...props) => {
  return (
    <Fragment>
      <TouchableOpacity
        style={{
          height : h/10,
          backgroundColor : 'red',
          justifyContent : 'center',
          alignItems : 'center',
          borderRadius : 12,
        }}
        onPress={() => route ? navigation.navigate(route) : null}
      >
        <View>
          <Text style={{...customFont(75)}}>{name}</Text>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
};

export default MenuButton
