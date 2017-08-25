import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'


import { Scene, Router } from 'react-native-router-flux'
//containers
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import CompleteProfile from './containers/completeProfile'
import Home from './containers/Home'
import WalletDetail from './containers/WalletDetail'
import Payment from './containers/Payment'
import Stats from './containers/Stats'
import PaymentsWallet from './containers/PaymentsWallet'

class Fenix extends Component {
  render() {
    return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="SignIn" component={SignIn} />
        <Scene key="SignUp" component={SignUp} />
        <Scene key="CompleteProfile" component={CompleteProfile} />
        <Scene key="Home" component={Home}  />
        <Scene key="WalletDetail" component={WalletDetail}/>
        <Scene key="Payment" component={Payment} />
        <Scene key="Stats" component={Stats} />
        <Scene key="PaymentsWallet" component={PaymentsWallet} />
      </Scene>
    </Router>

    )
  }
}

export default Fenix


