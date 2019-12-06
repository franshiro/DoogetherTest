import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar, 
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import Geolocation from '@react-native-community/geolocation'
import {h, customFont} from '../components/variable/dimension'

class Location extends Component{
  state = {
    initial : '',
    id : '',
    form : null,
    checkedBox : true,
    latlong : null,
    data : null,
    region: null,
    chooseImage : null,
    modalSubmissionProcessVisible : false,
    isSubmissionProcess : false,
    cameraLoading : false,
    mapLoading : false,
    isJobHasLocation : false
  };

  setMapToState = (position) => {
    this.setState({
      mapLoading : false,
      data : {
        ...this.state.data,
        long : position.coords.longitude,
        lat : position.coords.latitude,
      },
      latlong : {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      },
      region : {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,
        latitudeDelta: 0.00522, 
        longitudeDelta: 0.00221,
      }
    })
  }

  getLocation = () => {
    this.setState({
      mapLoading : true
    }, () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setMapToState(position);
        },
        error => {
          this.setState({
            mapLoading : false
          },() => {
            alert('Gagal Mendapatkan Lokasi, Pastikan GPS anda menyala dan sinyal dalam kondisi baik')
          })
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      );
    })
  }

  componentDidMount() {
    this.getLocation()
  }

  render(){
    const {mapLoading, latlong} = this.state
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={{...customFont(60), color : '#0984e3'}}> back </Text>
        </TouchableOpacity>
        <View
          style={{
            height : h/1.12,
            backgroundColor : 'yellow'
          }}
        >
          {
            mapLoading ? <ActivityIndicator /> : <Text>{JSON.stringify(latlong)}</Text>
          }
        </View>
      </SafeAreaView>
    )
  }
}

export default Location