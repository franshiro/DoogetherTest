import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {h, w} from '../components/variable/dimension'

class Api extends Component{
  render(){
    return (
      <SafeAreaView>
        <View>
          <Text>API Test</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default Api