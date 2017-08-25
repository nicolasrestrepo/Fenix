import React, { Component } from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import OnlyPayment from './Payment'
import { Actions } from 'react-native-router-flux'

class ListPayments extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.lastPayments),
            loading: true
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.lastPayments != this.props.lastPayments) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(newProps.lastPayments),
                loading: false
            })
        }
    }
    renderList(){
         return (
                <View style={styles.container}>
                    <Text style={styles.title}>Ultimos pagos</Text>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={(payment) => <OnlyPayment payment={payment} />}
                    />
                </View>

            );
    }
    renderMessage(){
        return(
        <View style={styles.container}>
            <Text style={styles.title}>No tienes ultimos pagos</Text>
        </View>
        )

    }
    render() {
        console.log('data source', this.state.dataSource)
        if (this.state.loading) {
            return(
            <View>
                <ActivityIndicator animating={true} size='large' />
            </View>
            )
        } else{
        return(
            <View>  
               {!this.state.dataSource._dirtyRows ? this.renderMessage() : this.renderList()}
            </View>
        )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80
    },
    title: {
        fontWeight: '900',
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10
    }
});
export default ListPayments
