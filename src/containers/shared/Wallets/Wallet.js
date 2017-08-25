import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PixelRatio
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Wallet = props => (
    <View style={styles.container}>
        <View style={styles.itemId}> 
            <Text style={styles.textAddress}>{props.wallet.address}</Text>
        </View>
    <View style={styles.item}>
    <Icon 
       name="btc" 
       color="#609fbf"
       size={30}
       />
     <Text style={styles.textWallet}>{props.wallet.network}</Text>
    </View>
    <View style={styles.item}>
        <Icon 
       name="bar-chart" 
       color="#609fbf"
       size={30}
       />
    <Text style={styles.textWallet}>{props.wallet.available_balance}</Text>
    </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingLeft: 40,
        paddingRight: 30,
        paddingBottom: 10,
        margin: 5,
        elevation: 5
    },
    item:{
        flexDirection: 'row',
        marginTop: 5
    },
    itemId:{
        flexDirection: 'row',
        borderBottomColor: '#609fbf',
        borderBottomWidth: 4 / PixelRatio.get(),
    },
    textWallet: {
        justifyContent: 'center',
        flexDirection: 'row',
        color: 'black',
        fontWeight: '800',
        fontSize: 15,
        width: '100%',
        marginLeft: 30
    },
    textAddress: {
        justifyContent: 'center',
        flexDirection: 'row',
        color: 'black',
        fontWeight: '800',
        fontSize: 13,
        width: '100%',
        marginLeft: 25
    }
})

export default Wallet
