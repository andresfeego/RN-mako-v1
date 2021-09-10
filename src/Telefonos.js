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

export default class telefonos extends Component<{}> {


constructor(props) {
  super(props);

  this.state = {
    colorCiudad: this.props.color,
  };
}




callNumber = (url) =>{
   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}


whatsapp = (phone,wp) =>{
  if (wp != 0) {
  const url = 'whatsapp://send?text=Buen día, te contacto por  medio de www.mako.guru, quisiera...&phone=+57'+phone; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
   };
}





  render() {


      const { telefono, wp, tipo} =this.props.telefono

      var colorWhat = '#26CC64';
    if (wp == '0') {
      colorWhat = 'gray';
    };


      let iconoWp = require('./imgs/wicono.png');
      let iconoTipo = 'ios-phone-portrait-outline';
      let llamada = `tel:${telefono}`;

        if (wp == 0) {
          iconoWp = require('./imgs/sinwicono.png');

        };

         if (tipo == 1) {
          iconoTipo = 'md-call';
          llamada = `tel:038${telefono}`;

        };



    return (




    <View style={styles.detalleBotones}>

        <TouchableOpacity style={[styles.btnAccion,{backgroundColor: '#354bd0'}]} onPress={()=> this.callNumber(llamada)}>
          <Icon name={''+iconoTipo} size={20} color={'white'} style={[styles.iconoLlamada]}/>
          <Text style={styles.offlineText4}>{telefono}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnAccion,{backgroundColor: colorWhat}]} onPress={()=> this.whatsapp(telefono,wp)}>
          <Icon name="logo-whatsapp" size={20} color={'white'} style={styles.iconoLlamada}/>
          <Text style={styles.offlineText4}>{telefono}</Text>
        </TouchableOpacity>

    </View>



 
      

    );
  }
}

const styles = StyleSheet.create({


cajainfo:{
  flex: 1,
  flexDirection: 'row',
  borderBottomColor: '#C5C6C6',
  borderBottomWidth: 0.5,
},

iconos:{
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
  flexDirection: 'row',
  paddingHorizontal: 5,
  borderRadius: 4,
  marginLeft: 15,
  height: '80%',
  flex: 1,
  elevation: 2,
  paddingVertical: 10,
  borderWidth: 1,

},

llamada:{
flex: 1,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',

},

wiconos:{
  width: 70,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 0,
  borderLeftColor: '#C5C6C6',
  borderLeftWidth: 0.5,
  height: '100%',
},

infor:{
flex: 1,
flexDirection: 'column',
justifyContent: 'center',
},

txtinfo:{
  //justifyContent: 'center',
  //alignItems: 'center',
  flex: 1,
  textAlign: 'right',
  fontSize: 20,
  paddingVertical: 10,
  flexWrap: 'nowrap', 


},

image:{
height: '70%',
  resizeMode: Image.resizeMode.contain,
},

txtAction:{
  fontSize: 8,
  paddingHorizontal: 3,
  borderRadius: 4,
  marginVertical: 2,
},

detalleBotones:{
  marginVertical: 5,
  width: '90%',
  flexDirection: 'row',
  marginLeft: 35
},

btnAccion:{
    flex: 1,
    height: 30,
    margin: 5,
    borderRadius: 20,
    flexDirection: 'row' ,
    elevation: 4

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


});
