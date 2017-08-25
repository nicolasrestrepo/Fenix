import React, { Component } from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import Wallet from './Wallet'
import {Actions} from 'react-native-router-flux'

class ListWallest extends Component {
    constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.wallets),
    };
  }

  componentWillReceiveProps(newProps){
    if(newProps.wallets != this.props.wallets){
        console.log('cambio la lista')
        this.setState({ 
            dataSource: this.state.dataSource.cloneWithRows(newProps.wallets)
        })
    }
  }
handleRedirect(wallet){
    Actions.WalletDetail({wallet})
}
    render() {
        return (
            <View  style={styles.container}>
                <Text style={styles.title}>Tus Billeteras</Text>
                <ListView                
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(wallet) => 
                   <TouchableOpacity onPress={() => this.handleRedirect(wallet)}> 
                    <Wallet wallet={wallet}/>
                   </TouchableOpacity > 
                    }
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80
  },
title:{
    fontWeight: '900',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10
}
});
export default ListWallest
