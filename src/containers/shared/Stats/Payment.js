import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PixelRatio,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OnlyPayment = props => (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.titleItem}>Fee..</Text>
            <Text style={styles.textPayment}>{props.payment.data.fee}</Text>
        </View>
         <View style={styles.item}>
             <Text style={styles.titleItem}>Amount..</Text>
            <Text style={styles.textPayment}>{props.payment.data.amount}</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.titleItem}>Status..</Text>
            <Text style={styles.textPayment}>{props.payment.data.status}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 40,
        paddingRight: 30,
        paddingBottom: 10,
        margin: 5,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: .2,
    },
    titleItem: {
        marginRight: 150
    },
    item: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 5,
        justifyContent: 'space-between'
    },
    itemId: {
        flexDirection: 'row',
        borderBottomColor: '#609fbf',
        borderBottomWidth: 4 / PixelRatio.get(),
    },
    textPayment: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        color: 'black',
        fontWeight: '800',
        fontSize: 15,
        width: '100%',
        marginLeft: 10
    },
    textAddress: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        color: 'black',
        fontWeight: '800',
        fontSize: 13,
        width: '100%',
        marginLeft: 30
    }
})

export default OnlyPayment
