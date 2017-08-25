import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Platform,
  Image,
  Alert
} from 'react-native';

//var FileUpload = require('NativeModules').FileUpload;
import ImagePicker from 'react-native-image-picker';
import imgCamera from '../../statics/images/2017_fenix-imgs-camera.png'

class Upload extends Component {
  constructor() {
    super()
    this.state = {
      avatar: imgCamera,
      imgBase64: ''
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
     ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source, temp;
        // You can display the image using either:
        //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        temp = response.data;

        //Or:
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatar: source,
          imgBase64: temp,
        });
      }
    });
  }



 async upload(){
    const response = await fetch('http://ec2-34-210-46-90.us-west-2.compute.amazonaws.com:8042/api/v1/me', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "authorization": "Bearer vMI4rxFNYoIsiv6yJmArVRIefRrET7E1BiMLUqn5sLu0G6nsOeQduD0LNZnyeot6CDMZ6IlNmWKjNNUMUGngMLhci9yeNE4VrDtpU9bcY18sAcWtFqDqxrU77vcnQc9PFPNYtELaMTe9WvHHeN1GQHwB5DIDqud5cN1Naw8tYlOGMYUZb8dnFlnWXnAKAuCAY0vfV7SdXmihPT675YDMkIs7t0vRfbUE8wxGN2U1TbKRnLPTVzCxi3L79ofIwnr8",
                },
                body: JSON.stringify({
                    avatar: this.state.imgBase64
                })
            })
    const data = await response.json()
    console.log(data)          
}
 



/*   uplo(){
  
    var obj = {
        uploadUrl: 'http://ec2-34-210-46-90.us-west-2.compute.amazonaws.com:8042/api/v1/me',
        method: 'PUT', // default 'POST',support 'POST' and 'PUT'
        headers: {
          'Accept': 'application/json',"headers": {
          "authorization": "Bearer pN2gCfBhl2W5k0ZVH4HeMpVH9BYj5coOgpN4kRdGlu4FOOsp9Jj0g0H6fMX7PvjhgZqdduYGvJiKQLVKkHsl8eFAA702pZxv8ZrQmDOhWrKyCBYVOKIDfSskje3JYYRnDAB36oIoL3Wb0safazbMEl0aUcfof2xox4BV2csjVMDcHX2YWuu5a8tSyg4tOj7fkvKmPQiwEwdnKIn9OntzUgcPABqu7Ca0TII1fUM1NsaRSE8F0ZmyvJnT8Zr0smF1",

           },
        },
        fields: {
          'avatar': this.state.imgBase64,
        },
        files: [

        ]

    };
    FileUpload.upload(obj, function(err, result) {
      console.log('upload:', err, result);
      if (err == null){
        Alert.alert(
          'Thong Bao',
          'Upload thanh cong',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      }else{
        Alert.alert(
          'Thong Bao',
          err,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      }

    })
  } */
  render(){
    console.log('img', this.state.imgBase64, 'avatar', this.state.avatar)
    return(
       <View style={styles.container}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={styles.avatar}>
              <Image style={styles.avatarImg} source={this.state.avatar} />
            </View>
          </TouchableOpacity>          
         <TouchableOpacity style={{ width:60, height:20,marginTop:20,justifyContent: 'center',
          alignItems: 'center'}} onPress={this.upload.bind(this)}>
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
  
  },
  avatarImg: {
    borderRadius: 50,
    width: 60,
    height: 60
  },
  avatar: {
    borderRadius: 50,
    width: 60,
    height: 60
  }

});

export default Upload;
