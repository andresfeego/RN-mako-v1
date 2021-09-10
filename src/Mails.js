/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Mails extends Component<{}> {


constructor(props) {
  super(props);

  this.state = {
    colorCiudad: this.props.color,
  };
}


sendMail = (mail) =>{
  const url = 'mailto:'+mail+'?subject=Contacto por medio de www.mako.guru&body=Mensaje: '; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}





  render() {


      const { correo} =this.props.mail

     

    return (
        <TouchableOpacity style={[styles.detalleBotones]} onPress={()=> this.sendMail(correo)}>  
          

                      
              <View style={[styles.btnAccion,{borderColor: this.props.color,backgroundColor: '#C92036'}]}>
                <Icon name={'ios-mail-outline'} size={20} color={'white'} style={[styles.iconoLlamada]}/>
                <Text style={styles.offlineText4} > {correo.toLowerCase()} </Text>
              </View>



          
        </TouchableOpacity>




 
      

    );
  }
}

const styles = StyleSheet.create({


detalleBotones:{
  marginVertical: 5,
  width: '90%',
  flexDirection: 'row',
  marginLeft: 35
},

    iconoLlamada:{
      height: 20,
    width: 20,
    borderRadius: 20,
    textAlign: 'center',
    alignSelf: 'center' ,
    marginHorizontal: 10,
  },

      offlineText4:{
    fontSize: 15,
    textAlign: 'left' ,
    margin: 5,
    color: '#fff'

  },


iconos:{
  justifyContent: 'center',
  alignItems: 'center', 
  flexDirection: 'row',
  paddingHorizontal: 5,
  borderRadius: 4,
  marginLeft: 15,
  height: '80%',
  flex: 1,
  elevation: 2,
  marginHorizontal: 10,
  marginVertical: 10,
  borderWidth: 1,
  maxWidth: '42%'

},

wiconos:{
  width: 20,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
  borderLeftColor: '#C5C6C6',
  borderLeftWidth: 0.5,
},

infor:{

flexDirection: 'column',
justifyContent: 'center',
},

btnAccion:{
    flex: 1,
    height: 35,
    margin: 5,
    borderRadius: 20,
    flexDirection: 'row' ,
    textAlignVertical: 'center' ,
    justifyContent: 'center' ,
    alignItems: 'center' ,
    elevation: 4

  },

txtinfo:{
  //justifyContent: 'center',
  //alignItems: 'center',
  flex: 1,
  textAlign: 'right',
   fontSize: 16,
     paddingVertical: 10,
     flexWrap: 'wrap', 

},

image:{
height: '100%',
  resizeMode: Image.resizeMode.contain,
},

txtAction:{
  fontSize: 8,
  paddingHorizontal: 3,
  borderRadius: 4,
  marginVertical: 2,
},



});
