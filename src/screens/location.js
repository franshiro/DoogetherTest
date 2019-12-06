import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Geolocation from '@react-native-community/geolocation'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {mapStyle} from '../components/mapStyle'
import {h, customFont} from '../components/variable/dimension'

class Location extends Component{
  state = {
    latlong : null,
    data : null,
    region: null,
    mapLoading : false,
  };

  onRegionChange = (region) => {
    this.setState({ region })
  }

  setMapToState = (position) => {
    this.setState({
      mapLoading : false,
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

  render(){
    const {mapLoading, latlong} = this.state
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={{...customFont(60), color : '#0984e3'}}> back </Text>
        </TouchableOpacity>
        <View>
          <Text style={{ textAlign : 'center', ...customFont(70)}}>My Location</Text>
        </View>
        <View
          style={{
            height : h/3,
            padding : '2%'
          }}
        >
          {
            mapLoading ? <ActivityIndicator /> : 
            <View
              style={styles.mapContainer}
            >
              {
                this.state.region ?
                  <MapView 
                    provider={Platform.OS === 'ios' ? null : PROVIDER_GOOGLE}
                    region={this.state.region}
                    onRegionChangeComplete={(region) => this.onRegionChange(region)}
                    zoomControlEnabled
                    style={styles.mapView}
                  >
                    <Marker 
                      coordinate={latlong}
                      title='Posisi Saya'
                      pinColor='blue'
                    />
                  </MapView> : null
              }
              <TouchableOpacity
                  style={styles.buttonLocation}
                  onPress={() => this.getLocation()}
                >
                  <Icon name="crosshairs" color="#70a1ff" size={23}/>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View
          style={{
            padding : '2%'
          }}
        >
          <Text style={styles.buttonAnnounce}>Klik tombol diatas untuk mendapatkan lokasi terbaru</Text>
          <Text style={styles.locationText}>Latitude : {latlong ? latlong.latitude : '0'}</Text>
          <Text style={styles.locationText}>Longitude : {latlong ? latlong.longitude : '0'}</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mapContainer : {
    height : '100%', 
    width : '100%', 
    top : '5%',
    borderRadius : 15,
    overflow : 'hidden',
    backgroundColor : 'skyblue'
  },
  mapView : {
    height : '100%', 
    width : '100%', 
    borderRadius : 10,
    backgroundColor : 'transparent', 
  },
  buttonLocation : {
    height : 45,
    width : 45,
    borderRadius : 22.5,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#fff',
    position : 'absolute',
    bottom : 14,
    right : 14
  },
  buttonAnnounce : {
    ...customFont(35),
    textAlign : 'right',
    marginBottom : 20
  },
  locationText : {
    ...customFont(60),
  }
})

export default Location