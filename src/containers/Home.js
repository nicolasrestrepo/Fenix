import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import { Actions } from 'react-native-router-flux';
import api from '../services/api'
import Header from './shared/Header';
import Menu from './shared/Menu';
import ListWallets from './shared/Wallets/ListWallets';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: '',
      isOpen: false,
      progress: false,
      wallets: [],
      messageAlert: '',
      tittleAlert: '',
      loading: true
    }
    this.toggle = this.toggle.bind(this)
    this.updateMenu = this.updateMenu.bind(this)
    this.createNewWallet = this.createNewWallet.bind(this)
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

  //Token
  async getToken() {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN)
    try {
      if (!accessToken) {
        Actions.SignIn()
      } else {
        const dataUser = await api.user.getInfo(accessToken)
        this.setState({
          userName: dataUser.data.userName,
          wallets: dataUser.data.wallets.data,
          id: dataUser.data._id,
          accessToken,
          loading: false
        })
      }
    } catch (err) {
      console.log('err in Home', err)
      Actions.SignIn()
    }
  }
  // endToken

  //Create Wallet
  async createNewWallet() {
    this.setState({ progress: true })
    try {
      const data = await api.user.createNewWallet(this.state.accessToken)
      console.log(data)
      this.setState({ progress: false })
      if (data.status >= 400) {
        this.setState({
          messageAlert: data.message.message,
          tittleAlert: 'Error'
        })
      } else {
        this.setState({
          wallets: this.state.wallets.concat(this.state.wallets),
          messageAlert: 'Billetera creada correctamente',
          tittleAlert: 'Proceso exitoso'
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
    } catch (err) {
      console.log('err', err)
    }
  }
  // end Create Wallet
  renderList() {
    return (
      <View>
        <ListWallets wallets={this.state.wallets} />
        <View style={styles.button}>
          {!this.state.progress && (
            <Button
              onPress={this.createNewWallet}
              title="Crear nueva Billetera"
              color="#609fbf"
            />
          )}
          <ActivityIndicator animating={this.state.progress} size='large' />
        </View>
      </View>
    )
  }
  renderLoading() {
    return (
      <View>
        <ActivityIndicator animating={true} size='large' />
      </View>
    )
  }
  render() {
    console.log(this.state.accessToken)
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
          {this.state.loading ? this.renderLoading() : this.renderList()}
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
    backgroundColor: '#f1f4f7'
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
    width: 250
  },
});

export default Home;
