import React, { Component } from 'react'
import { 
    AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Button,
  PixelRatio
 } from 'react-native';
import { Pie } from 'react-native-pathjs-charts'
import SideMenu from 'react-native-side-menu';
import api from '../services/api'
import Header from './shared/Header';
import Menu from './shared/Menu';

const ACCESS_TOKEN = 'access_token';
const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {
       wallets: '',
       userName: '',
       id: '',
       accessToken: '',
       stats: [],
       isOpen: false
    }
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
        const dataUser = await api.user.getInfo(accessToken);
        const data = await api.wallet.getStatistics(accessToken, this.props.data)
        this.setState({
          wallets: dataUser.data.wallets.data,
          userName: dataUser.data.userName,
          id: dataUser.data._id,
          accessToken,
          stats: data.stats
        })
      }
    } catch (err) {
      console.log('err in WalletDetail', err)
      Actions.SignIn()
    }
  }

  render() {
      let data = this.state.stats.map((value) => {
        return ({
          name: `${value._id.day}-${months[value._id.month - 1]}-${value._id.year}`,
          total: 1
        })
      });


   let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

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
          <Pie data={data}
            options={options}
            accessorKey="population"
            margin={{top: 20, left: 0, right: 20, bottom: 20}}
            color="#2980B9"
            pallete={
              [
                {'r':25,'g':99,'b':201},
                {'r':24,'g':175,'b':35},
                {'r':190,'g':31,'b':69},
                {'r':100,'g':36,'b':199},
                {'r':214,'g':207,'b':32},
                {'r':198,'g':84,'b':45}
              ]
            }
            r={50}
            R={150}
            legendPosition="topLeft"
            label={{
              fontFamily: 'Arial',
              fontSize: 8,
              fontWeight: true,
              color: '#ECF0F1'
            }}
          />
        </View>
    </SideMenu>
 
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f4f7',
  },
});

export default Stats;

