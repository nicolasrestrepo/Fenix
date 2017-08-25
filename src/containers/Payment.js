import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView 
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import { Actions } from 'react-native-router-flux';
import Header from './shared/Header';
import Menu from './shared/Menu';
import api from '../services/api';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
const ACCESS_TOKEN = 'access_token';

class Payment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accessToken: '',
      isOpen: false,
      to: '',
      amounts: 0,
      error: '',
      progress: false,
      tittleAlert:'',
      messageAlert:''
    }
    this.toggle = this.toggle.bind(this)
    this.updateMenu = this.updateMenu.bind(this)
    this.payment = this.payment.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  updateMenu(isOpen) {
    this.setState({ isOpen })
  }
  componentDidMount() {
    this.getToken()
  }
  //token
  async getToken() {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN)
    try {
      if (!accessToken) {
        Actions.SignIn()
      } else {
        const dataUser = await api.user.getInfo(accessToken)
        this.setState({
          accessToken,
          wallets: dataUser.data.wallets.data,
          userName: dataUser.data.userName,
          id: dataUser.data._id,
        })
      }
    } catch (err) {
      console.log('err', err)
      Actions.SignIn()
    }
  }
  //payments
   async payment(){
     this.setState({progress: true})
     try{
      const data = await api.payments.transfer(this.state.accessToken, this.props.data, this.state.to, parseFloat(this.state.amounts))
      if(data.status == "fail"){
        this.setState({
        tittleAlert: 'Error',
        messageAlert: data.data.error_message,
        progress: false
        })
      }else{
         this.setState({
        tittleAlert: 'Transaccion exitosa',
        messageAlert: `
         Transferido: ${data.data.amount} 
         Plataforma: ${data.data.fee} 
         Total: ${data.data.total}`,
         progress: false
        })
      }        
        Alert.alert(
        this.state.tittleAlert,
        this.state.messageAlert,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      ) 
     }catch(error){
       console.log('error', error)
     }
 
    }
  

  render() {
    return (
      <SideMenu
        menu={<Menu 
        userName={this.state.userName}
        id={this.state.id}
        />}
        isOpen={this.state.isOpen}
        menuPosition='right'
        onChange={(isOpen) => this.updateMenu(isOpen)}
      >
        <View style={styles.container}>
          <Header toggle={this.toggle} />
          <Text style={styles.title}>Pago</Text>
          <View style={styles.containerTextInput}>
            <Text style={styles.text}>Billetera de origen</Text>
            <View style={styles.inputOrigen}>  
              <Text style={styles.textOrigen} >{this.props.data}</Text>
            </View>
          </View>
          <View style={styles.containerTextInput}>
            <Text style={styles.text}>Billetera de destino</Text>
            <TextInput
              onChangeText={(text) => this.setState({ to: text })}
              style={styles.textInput}
            />
          </View>
          <View style={styles.containerTextInput}>
            <Text style={styles.text}>monto (minimo 0.0001)</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(text) => this.setState({ amounts: text })}
              style={styles.textInput}
            />
          </View>
          <HideWithKeyboard>       
            <View style={styles.button}>
          {!this.state.progress && (
             <Button
              onPress={this.payment}
              title="Pagar"
              color="#609fbf"
            />
          )}
          <ActivityIndicator animating={this.state.progress} size='large' />
        </View>
           </HideWithKeyboard>
        </View>
      </SideMenu>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f4f7',
    paddingTop: 35
  },
  text: {
    color: 'black'
  },
  title: {
     fontWeight: '900',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 3,
  },
  textTerm: {
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
    elevation: 20
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
    height: 35,
    backgroundColor: 'white'
  },
  button: {
    marginTop: 80,
    width: 250
  },
  inputOrigen:{
    width: 250,
    height: 35,
    paddingTop: 10,
    backgroundColor: '#609fbf', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  textOrigen:{
    fontSize: 11,
    fontWeight: '900',
    color: '#025268'
  },

});

export default Payment;
