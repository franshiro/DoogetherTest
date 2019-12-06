import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar, 
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {h, customFont} from '../components/variable/dimension'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

class Todo extends Component{
  state = {
    todo : '',
    todos : null
  }

  updateTodo = async (id) => {
    try{
      const { todos } = this.state
      let newTodos = todos
      const filterUpdate = await todos.filter(i => i.id == id)

      filterUpdate[0].isDone = !filterUpdate[0].isDone

      await AsyncStorage.setItem('Todo', JSON.stringify(newTodos))

      await this.setState({
        todos : newTodos
      })
    }
    catch(error){
      console.warn(error)
    }
  }

  deleteTodo = async (idDel) => {
    try{
      const {todos} = this.state
      const filterTodo = await todos.filter(({ id }) => id !== idDel)
      await AsyncStorage.setItem('Todo', JSON.stringify(filterTodo))
      await this.getTodo()
    }
    catch(error){
      console.warn(error)
    }
  }

  clearState = () => {
    this.setState({
      todo : ''
    })
  }

  submitTodo = async () => {
    try{
      const {todo, todos} = this.state
      if(todo){
        let newTodos = todos ? [...todos] : []
        const data = {
          id : `${Math.floor(Math.random() * 100)}${Math.floor(Math.random() * 100)}`,
          todo,
          isDone : false
        }

        newTodos.push(data)
        await AsyncStorage.setItem('Todo', JSON.stringify(newTodos))
        await this.getTodo()
        await this.clearState()
      } else {
        Alert.alert('Silahkan isi form terlebih dahulu.')
      }
    }
    catch(error){
      console.warn(error)
    }
  }

  getTodo = async () => {
    try{
      const value = await AsyncStorage.getItem('Todo')
      if(value){
        this.setState({
          todos : JSON.parse(value)
        })
      } else {
        Alert.alert('Belum ada data')
      }
    }
    catch(error){
      console.warn(error)
    }
  }

  componentDidMount(){
    this.getTodo()
  }

  render(){
    const {todo, todos} = this.state
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
          }}
        >
          <View
            style={{
              height : '15%',
              backgroundColor : '#dfe6e9',
              paddingHorizontal : '2%'
            }}
          >
            <View
              style={{
                height : '100%',
                justifyContent : 'space-evenly'
              }}
            >
              <TextInput 
                style={{
                  height : '40%',
                  backgroundColor : '#b2bec3',
                  paddingHorizontal : 20,
                  borderRadius : 12,
                  color : '#fff'
                }}
                placeholder="Todo..."
                placeholderTextColor = "#dfe6e9"
                value={todo}
                onChangeText={value => this.setState({todo : value})}
              />
              <TouchableOpacity
                style={{
                  height : '40%',
                  backgroundColor : '#2980b9',
                  borderRadius : 12,
                  justifyContent : 'center',
                  alignItems : 'center'
                }}
                onPress={this.submitTodo}
              >
                <Text style={{color : '#fff'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            style={{
              padding : '2%'
            }}
          >
            {
              todos && todos.map(({id, todo, isDone}, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor : isDone ? '#576574' : '#dfe6e9',
                    marginBottom : 10,
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    borderRadius : 12,
                    overflow : 'hidden'
                  }}
                >
                  <View style={{ width : '79%', padding : 10}}>
                    <Text style={{ color : isDone ? '#ecf0f1' : '#2d3436', textAlign : 'justify'}}>{todo}</Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      width : '10%',
                      backgroundColor : '#2980b9',
                      justifyContent : 'center',
                      alignItems : 'center'
                    }}
                    onPress={() => this.updateTodo(id)}
                  >
                    <Icon name={isDone ? 'check-square' : 'square'} style={{color : '#fff', ...customFont(50)}} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      width : '10%',
                      backgroundColor : '#d63031',
                      justifyContent : 'center',
                      alignItems : 'center'
                    }}
                    onPress={() => this.deleteTodo(id)}
                  >
                    <Icon name="trash-alt" style={{color : '#fff', ...customFont(50)}}/>
                  </TouchableOpacity>
                </View>
              ))
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

export default Todo