import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {h, w} from '../components/variable/dimension'

class Location extends Component{
  render(){
    return (
      <SafeAreaView>
        <View>
          <Text>Location</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default Location