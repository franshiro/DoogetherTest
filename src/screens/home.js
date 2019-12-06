import React, {Fragment} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {h, w, customFont} from '../components/variable/dimension'
import MenuButton from '../components/menuButton'

const Home = (props) => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"/>
      <SafeAreaView>
        <View 
          style={{
            height : h, 
            width : w, 
            padding : '2%',
          }}
        >
          <View 
            style={{
              top : '5%'
            }}
          >
            <Text style={{ textAlign : 'center', ...customFont(150), color : '#00b894'}}>Doogather Test</Text>
          </View>
          <View
            style={{
              height : h/3,
              top : '7%',
              justifyContent : 'space-evenly'
            }}
          >
            <MenuButton 
              name="Todo"
              route="Todo"
              navigation = {props.navigation}
            />
            <MenuButton 
              name="API Test"
              route="Api"
              navigation = {props.navigation}
            />
            <MenuButton 
              name="My Location"
              route="Location"
              navigation = {props.navigation}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Home;
