import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import api from '../services/api';

const ACCESS_TOKEN = 'access_token';

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      progress: false
    }
    this.handleLogin = this.handleLogin.bind(this)
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
  async handleLogin() {
    this.setState({ progress: true })
    try {
      const data = await api.authentication.SignIn(this.state.email, this.state.password)
      if (data.error >= 400) {
        this.setState({
          error: data.error_description, 
          progress: false
        })
      } else {
        let accessToken = data.access_token
        this.storeToken(accessToken)
        this.setState({
          progress: false
        })
        Actions.Home()
      }

    } catch (error) {
      console.log('error', error)
    }

  }

  handlePress() {
    Actions.SignUp()
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
        <View style={styles.form}>
          <View>
            <Text style={styles.text}>Correo</Text>
            <TextInput
              keyboardType='email-address'
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          <View style={styles.containerTextInput}>
            <Text style={[styles.text, styles.textInputOver]}>
              Contraseña</Text>
            <TextInput
              onChangeText={(text) => this.setState({ password: text })}
              style={styles.textInput}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.contentError}>
          <Text style={styles.textError}>{this.state.error}</Text>
          </View>
        <View style={styles.message}>
          <Text style={styles.text}>¿No tienes una cuenta?</Text>
          <Text
            style={styles.textOnPress}
            onPress={this.handlePress}>Registrate</Text>
        </View>
        <View style={styles.button}>
          {!this.state.progress && (
            <Button
              onPress={this.handleLogin}
              title="Iniciar Sesión"
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
    marginBottom: 100
  },
  text: {
    color: 'white'
  },
  textOnPress: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5
  },
  contentError:{
    marginTop: 15,
  },
  textError: {
    color: 'red',
  },
  containerTextInput: {
    paddingTop: 20,
    justifyContent: 'center',
  },
  textInputOver: {
    alignSelf: 'stretch'
  },
  textInput: {
    width: 250,
    height: 40,
    backgroundColor: 'white',
  },
  button: {
    marginBottom: 20,
    width: 250
  },
  message: {
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default SignIn;

