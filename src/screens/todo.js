import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {h, w} from '../components/variable/dimension'

class Todo extends Component{
  render(){
    return (
      <SafeAreaView>
        <View>
          <Text>Todo</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default Todo