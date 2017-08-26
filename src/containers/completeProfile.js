import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Picker,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import api from '../services/api';
import ImagePicker from 'react-native-image-picker';
import imgCamera from '../statics/images/2017_fenix-imgs-camera.png'
const ACCESS_TOKEN = 'access_token';

class CompleteProfile extends Component {

  constructor() {
    super()
    this.state = {
      numberCel: '',
      genero: '',
      accessToken: '',
      userName: '',
      userId: '',
      avatar: imgCamera,
      imgBase64: ''
    }
    this.handle = this.handle.bind(this)
  }

  componentDidMount(){
    this.getToken()
  }
  async getToken() {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN)
    try {
      if (!accessToken) {
        Actions.SignIn()
      } else {
        const dataUser = await api.user.getInfo(accessToken)
        this.setState({
          accessToken, 
          userName: dataUser.data.userName, 
          userId: dataUser.data._id
         })
      }
    } catch (err) {
      console.log('err in home', err)
      Actions.SignIn()
    }
  }
  async handle(){
    try{
    const data = await api.user.completeProfile(this.state.accessToken, 
      this.state.genero, this.state.numberCel, this.state.imgBase64)
     Actions.Home()
    }catch(err){
      console.log('err', err)
    }
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
     ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source, temp;
        temp = response.data;
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }
        this.setState({
          avatar: source,
          imgBase64: `data:image/png;base64,${temp}`,
        });
      }
    });
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
        <Text style={styles.textWelcome}>
          Hola {this.state.userName}  completa tu perfil
          </Text>
        <View>
           <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={styles.avatar}>
              <Image style={styles.avatarImg} source={this.state.avatar} />
            </View>
          </TouchableOpacity>    
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.text}>Numero de celular</Text>
            <TextInput
              style={styles.textInput}
            />
          </View>
          <View style={styles.containerInputMin}>
            <View>
              <Text style={styles.text}>Sexo</Text>
              <Picker
                style={styles.inputMin}
                onValueChange={(itemValue, itemIndex) => this.setState({ genero: itemValue })}>
                <Picker.Item label="M" value="masculino" />
                <Picker.Item label="F" value="femenino" />
              </Picker>
            </View>
            <View>
              <Text style={styles.text}>Tu ID</Text>
              <View style={styles.inputID} >
               <Text style={styles.textId}> {this.state.userId}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.message}>
          <Text style={styles.text}>
            Tu ID es para el reconocimiento de usuario
        </Text>
        </View>
        <View style={styles.button}>
          <Button
          onPress={this.handle}
            title="Confirmar"
            color="#609fbf"
          />
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
  textOnPress: {
    color: 'white',
    fontWeight: 'bold'
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
    height: 35,
    backgroundColor: 'white',
  },
  button: {
    marginBottom: 50,
    width: 250
  },
  message: {
    marginTop: 10,
    marginBottom: 40
  },
  textWelcome: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    marginBottom: 70
  },
  text: {
    color: 'white'
  },
  imgCamera: {
    width: 45,
    height: 45
  },
  containerCamera: {
    backgroundColor: '#609fbf',
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20
  },
  containerInputMin: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputMin: {
    width: 90,
    height: 35,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  textId:{
    fontSize: 10.5,
    fontWeight: '900',
    color: '#025268'
  },
  inputID: {
    width: 150,
    height: 35,
    paddingTop: 10,
    backgroundColor: '#609fbf',
  },
  avatarImg: {
    borderRadius: 50,
    width: 60,
    height: 60
  },
  avatar: {
    borderRadius: 50,
    width: 60,
    height: 60
  }
})
export default CompleteProfile;

