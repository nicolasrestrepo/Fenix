import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Button,
  PixelRatio,
  TextInput,
  Keyboard
} from 'react-native';

import QRCode from 'react-native-qrcode';
import SideMenu from 'react-native-side-menu';
import { Actions } from 'react-native-router-flux';
import api from '../services/api'
import Header from './shared/Header';
import Menu from './shared/Menu';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

const ACCESS_TOKEN = 'access_token';

class WalletDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: '',
      isOpen: false,
      wallets: []
    }
    this.toggle = this.toggle.bind(this)
    this.updateMenu = this.updateMenu.bind(this)
    this.payment = this.payment.bind(this)
    this.stats = this.stats.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  updateMenu(isOpen) {
    this.setState({ isOpen })
  }
  payment(addressFrom){
    Actions.Payment(addressFrom)
  }
  stats(idWallet){
    Actions.PaymentsWallet(idWallet)
  }
  graphics(idWallet){
    Actions.Stats(idWallet)
  }
  componentDidMount() {
    this.getToken()
    
  }

  async getToken() {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN)
    try {
      if (!accessToken) {
        Actions.SignIn()
      } else {
        const dataUser = await api.user.getInfo(accessToken)
        console.log('data', dataUser)
        this.setState({
          wallets: dataUser.data.wallets.data,
          userName: dataUser.data.userName,
          id: dataUser.data._id,
          accessToken
        })
      }
    } catch (err) {
      console.log('err in WalletDetail', err)
      Actions.SignIn()
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
          <Text style={styles.title}>Detalles de tu Billetera</Text>
          {/* id */}
          <View style={styles.containerItem}>
            <Text style={styles.titleContainer}>Id</Text>
          
            {/* <Text ref="sourceText" onLongPress={this.copu} style={styles.Id}>
              {this.props.wallet.address}</Text> */}
                <TextInput 
                onSubmitEditing={Keyboard.dismiss}
                style={styles.Id} 
                defaultValue={this.props.wallet.address}
                editable={true}
                />
          </View>
          {/* /id */}
          <HideWithKeyboard>
         <View style={styles.rowContainer}>
          {/* saldo */}
          <View style={styles.containerItem}>
            <Text style={styles.titleContainer}>Saldo</Text>
            <View style={styles.saldo}>
              <Text style={styles.available}>
                {this.props.wallet.available_balance}
              </Text>
              <Text style={styles.typeMoney}>
                {this.props.wallet.network}
              </Text>
            </View>
          </View>
          {/* /saldo */}
          {/* QR */}
          <View style={styles.containerItem}>
            <View style={styles.titleQR}>
              <Text style={styles.titleContainer}>QR</Text>
            </View>
            <View style={styles.saldo}>
              <QRCode
                value={this.props.wallet.address}
                size={180}
                bgColor='black'
                fgColor='white' />
            </View>
          </View>
          {/* /QR */}
        </View>   
  </HideWithKeyboard>
       <View style={styles.containerButton}> 
         <Button
              onPress={() => this.payment(this.props.wallet.address)}
              title="Pagar"
              color="#609fbf"
          />
          <Button
              onPress={() => this.stats(this.props.wallet.label)}
              title="Estadisticas"
              color="#609fbf"
          />
        </View>  
        <View style={styles.containerButton}>
          <Button
            onPress={() => this.graphics(this.props.wallet.label)}
            title="Movimientos del mes"
            color="#609fbf"
          />
        </View>
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
    width: '100%',
    backgroundColor: '#f1f4f7'
  },
  containerButton:{
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200
  },
  title: {
     fontWeight: '900',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 3,
    marginTop: 35
  },
  titleContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    width: '100%'
  },
  containerItem: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    padding: 15,
    elevation: 3
  },
  rowContainer:{
    flexDirection: 'row'
  },
  saldo: {
    justifyContent: 'center'
  },
  available: {
    fontSize: 13,
    margin: 10
  },
  Id:{
    width: 300,
    fontSize: 12.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default WalletDetail;
