import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView, 
  TextInput,
  Alert
} from 'react-native';
import axios from 'axios'

import {h, w, customFont} from '../components/variable/dimension'

class Api extends Component{
  state={
    data : null,
    url : 'https://jsonplaceholder.typicode.com/posts',
    title : '',
    body : '',
    userId : 12
  }

  getPost = () => {
    axios({
      method : "GET",
      url : this.state.url
    })
    .then(({data}) => {
      this.setState({
        data
      })
    })
    .catch(error => {
      console.warn(error)
    })
  }

  submitPost = () => {
    const {title, body, userId} = this.state
    if(title && body){
      axios({
        method : "POST",
        url : this.state.url,
        body: JSON.stringify({
          title,
          body,
          userId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => {
        console.warn(response)
        this.setState({
          title : "",
          body : ""
        }, () => Alert.alert(`ID : ${JSON.stringify(response.data.id)}; Status : ${JSON.stringify(response.status)} `))
      })
      .catch(error => {
        console.warn(error)
      })
    } else {
      Alert.alert('Isikan Semua Form')
    }
  }

  componentDidMount(){
    this.getPost()
  }


  render(){
    const { data, title, body } = this.state
    return (
      <SafeAreaView>
        <View
          style={{
            height : h/7,
            backgroundColor : "#81ecec",
            padding : '2%'
          }}
        >
          <Text style={{textAlign : 'center', color : "#636e72", ...customFont(50)}}>API TEST</Text>
          <View
            style={{
              height : '100%',
              justifyContent : 'space-between'
            }}
          >
            <TextInput 
              style={{
                height : '30%',
                backgroundColor : '#ffeaa7'
              }}
              placeholder="Title"
              value={title}
              onChangeText={value => this.setState({title : value})}
            />
            <TextInput 
              style={{
                height : '30%',
                backgroundColor : '#ffeaa7'
              }}
              placeholder="Content"
              value={body}
              onChangeText={value => this.setState({body : value})}
            />
            <TouchableOpacity
              style={{
                height : '30%',
                backgroundColor : '#0984e3',
                borderRadius : 12,
                justifyContent : 'center',
                alignItems : 'center'
              }}
              onPress={this.submitPost}
            >
              <Text style={{color : '#fff'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height : h/1.25,
            padding : '2%'
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height : '100%',
            }}
          >
            {
              data && data.map(({title, body}, index) => (
                <View 
                  key={index}
                  style={{
                    backgroundColor : '#55efc4',
                    padding : 10,
                    marginBottom : 10,
                  }}
                >
                  <Text style={{textAlign : 'center', color : '#2d3436', ...customFont(60), marginBottom : 10}}>{title}</Text>
                  <Text style={{textAlign : 'justify', color : '#2d3436', ...customFont(45)}}>{body}</Text>
                </View>
              ))
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

export default Api