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
import SideMenu from 'react-native-side-menu';
import api from '../services/api'
import Header from './shared/Header';
import Menu from './shared/Menu';
import ChartView from 'react-native-highcharts';


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
       isOpen: false,
       statsTest: []
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
        const dataUser = await api.user.getInfo(accessToken);
        const data = await api.wallet.getStatistics(accessToken, this.props.data)
        this.setState({
          wallets: dataUser.data.wallets.data,
          userName: dataUser.data.userName,
          id: dataUser.data._id,
          accessToken,
          stats: data.stats,
          statsTest:[
              {
                  "_id": {
                      "day": 9,
                      "month": 8,
                      "year": 2017
                  },
                  "totalValue": 0.0009874
              },
              {
                  "_id": {
                      "day": 8,
                      "month": 8,
                      "year": 2017
                  },
                  "totalValue": 0.0005076
              }
          ],
        })
      }
    } catch (err) {
      console.log('err in WalletDetail', err)
      Actions.SignIn()
    }
  }

  render() {
    const state = this.state.statsTest;
 var Highcharts='Highcharts';
    var conf={
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
            },
            title: {
                text: 'Estaisticas del mes'
            },
            xAxis: {

            },
            yAxis: {
                title: {
                    text: 'BitCoins'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                    data = state.map(value => ({
                        x: `${value._id.day}-${value._id.month}-${value._id.year}`,
                        y: value.totalValue
                    }));
                    return data;
                }())
            }]
        };
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
        <Header toggle={this.toggle} />
        <ChartView style={{flex:1}} config={conf} stock={false}></ChartView>
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

