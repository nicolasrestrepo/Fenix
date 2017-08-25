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
import ListPayments from './shared/Stats/ListPayments';

const ACCESS_TOKEN = 'access_token';

class PaymentsWallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: '',
      isOpen: false,
      progress: false,
      lastPayments: [],
      messageAlert: '',
      tittleAlert: ''
    }
    this.toggle = this.toggle.bind(this)
    this.updateMenu = this.updateMenu.bind(this)
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
  async getToken() {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN)
    try {
      if (!accessToken) {
        Actions.SignIn()
      } else {
        const dataUser = await api.user.getInfo(accessToken)
        const dataPayments = await api.wallet.getStatistics(accessToken, this.props.data)
        console.log(dataPayments)
        this.setState({
          userName: dataUser.data.userName,
          id: dataUser.data._id,
          accessToken,
          lastPayments: dataPayments.lastPayments
        })
      }
    } catch (err) {
      console.log('err in PaymentsWallet', err)
      Actions.SignIn()
    }
  }

  render() {
    console.log('this.lastPayments', this.state.lastPayments)
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
          <View>
             <ListPayments lastPayments={this.state.lastPayments} /> 
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
    backgroundColor: '#f1f4f7'
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
    width: 250
  },
});

export default PaymentsWallet;
