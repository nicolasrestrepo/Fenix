import React, { Component } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    PixelRatio,
    AsyncStorage
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const window = Dimensions.get('window');
const ACCESS_TOKEN = 'access_token';

class Menu extends Component {
    constructor(props) {
        super(props)

        this.logOut = this.logOut.bind(this)
        this.redirect = this.redirect.bind(this)
    }
    
    redirect(){
        Actions.Home()
        
    }

     logOut() {
        AsyncStorage.removeItem(ACCESS_TOKEN).then(
            () => {
                Actions.SignIn()
            }
        )
    }
    render() {
        console.log(`data:image/jpeg;base64,${this.props.avatar}`)
        return (
            <View style={styles.container}>
                <View style={styles.infoUser}>
                   <Image
                     source={{uri: `data:image/jpeg;base64,${this.props.avatar}`}}
                    />
                    <Text style={styles.textInfo}>{this.props.userName}</Text>
                    <Text style={styles.textInfo}>{this.props.id}</Text>
                </View>
                <View style={styles.items}>
                    <View style={styles.item}>
                        <Text onPress={this.redirect} style={styles.textItem}>Mis Billeteras</Text>
                    </View>
{/*                     <View style={styles.item}>
                        <Text style={styles.textItem}>Pagos</Text>
                    </View> */}
                    <View style={styles.item} >
                        <Text onPress={this.logOut} style={styles.textItem}>Cerrar Sesion</Text>
                    </View>
                    {/*                     <View style={styles.item}>
                        <Text style={styles.textItem}>Cambio</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textItem}>Tasas de cambios</Text>
                    </View> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#025268'
    },
    textInfo: {
        fontWeight: '900',
        color: '#025268'
    },
    infoUser: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1

    },
    items: {
        flex: 3,
        marginTop: 30,
    },
    item: {
        height: 50,
        marginTop: 15,
        borderBottomColor: 'white',
        borderBottomWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textItem: {
        marginLeft: 10,
        fontWeight: '900',
        color: '#609fbf',
        fontSize: 15
    },
})

export default Menu
