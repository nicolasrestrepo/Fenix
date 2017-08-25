import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Button,
  AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';
import api from '../services/api';

const ACCESS_TOKEN = 'access_token';

class SignUp extends Component {

  constructor() {
    super()

    this.state = {
      email: '',
      userName: '',
      password: '',
      checked: false,
      progress: false,
      btnDisabled: true,
      error: ''
    }
    this.handleRegister = this.handleRegister.bind(this);
  }
  handlePress(){
    Actions.SignIn()
  }
  storeToken(token) {
    AsyncStorage.setItem(ACCESS_TOKEN, token, err => {
      if (err) {
        console.log('error')
        throw err;
      }
      console.log('save token :)')
    }).catch(err => {
      console.log('err', err)
    })
  }
  async handleRegister() {
    this.setState({ progress: true })
    try {
     const data = await api.authentication.SignUp(this.state.userName, this.state.email, this.state.password);
     console.log('data in signUp', data) 
     if (data.error == "Validation error") {
        this.setState({
          progress: false,
          error: data.error_description._message
        })
      }else{
        let accessToken = data.access_token
        this.storeToken(accessToken)
        this.setState({progress: false })
        Actions.CompleteProfile()
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgLogo}>
          <Image
            style={styles.logoFenix}
            source={require('../statics/images/fenix.png')}
          />
        </View>
        <View>
          <View style={styles.containerTextInput}>
            <Text style={styles.text}>Correo electronico</Text>
            <TextInput
              keyboardType={ "email-address" }
              returnKeyType={ "done" }
              onChangeText={(text) => this.setState({ email: text })}
              style={styles.textInput}
            />
          </View>
          <View style={styles.containerTextInput}>
            <Text style={styles.text}>Nombre de usuario</Text>
            <TextInput
              onChangeText={(text) => this.setState({ userName: text })}
              style={styles.textInput}
            />
          </View>
          <View style={styles.containerTextInput}>
            <Text style={styles.text}>Contraseña</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.message}>
          <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
          <Text
            style={styles.textOnPress}
            onPress={this.handlePress}>Ingresar</Text>
        </View>
        <View style={styles.contentError}>
          <Text style={styles.textError}>{this.state.error}</Text>
        </View>
        <View style={styles.message}>
          <CheckBox
            containerStyle={{ backgroundColor: 'white', width: 20, height: 20, borderRadius: 90 }}
            checkboxStyle={{ width: 20, height: 20 }}
            checked={this.state.checked}
            onChange={(checked) => this.setState({ checked: !this.state.checked, btnDisabled: !this.state.btnDisabled })}
            underlayColor='transparent'
          />
          <Text style={styles.textTerm}>Acepto terminos y condiciones</Text>
        </View>
        <View style={styles.button}>
          {!this.state.progress && (
             <Button
              disabled={this.state.btnDisabled}
              onPress={this.handleRegister}
              title="Crear cuenta"
              color="#609fbf"
            />
          )}
          <ActivityIndicator animating={this.state.progress} size='large' />
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#025268',
    paddingTop: 35
  },
  imgLogo: {
    paddingTop: 0,
  },
  logoFenix: {
    width: 250,
    height: 50,
    marginBottom: 40
  },
  text: {
    color: 'white'
  },
  textTerm:{
    color: 'white',
    marginLeft: 10
  },
  textOnPress: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5
  },
  containerTextInput: {
    paddingTop: 20,
    justifyContent: 'center', 
  },
  textInputOver: {
    alignSelf: 'stretch'
  },
  contentError: {
    marginTop: 15,
  },
  textError: {
    color: 'red',
    fontWeight: '800'
  },
  textInput: {
    width: 250,
    height: 40,
    backgroundColor: 'white',
  },
  button: {
    marginBottom: 10,
    width: 250
  },
  message: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
export default SignUp;