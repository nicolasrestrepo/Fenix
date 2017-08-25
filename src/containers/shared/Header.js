import React from 'react'
import { 
  View, 
  Image, 
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

const Header = (props) => (
  <View style={styles.container}>  
          <Image
            style={styles.logo}
            source={require('../../statics/images/fenix.png')}
          /> 
      <TouchableWithoutFeedback onPress={props.toggle}>
       <Icon 
       name="bars" 
       color="#609fbf"
       size={25}
       />
      </TouchableWithoutFeedback>  

  </View>
)
const styles = StyleSheet.create({
  container:{
    width: '100%',
    backgroundColor: '#025268',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 60,
    zIndex: 50
  },
  logo:{
    width: 140,
    height: 30
  }
})
export default Header