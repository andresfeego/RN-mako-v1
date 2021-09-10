/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, Linking, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Slides from './Slides.js'
import ListaPatrocinadores from './ListaPatrocinadores.js'
import Desarrolladores from './Desarrolladores.js'
import Icon from 'react-native-vector-icons/Ionicons';

const {width}= Dimensions.get('window')

export default class Acerca extends Component {
  





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


callBrowser = (url) =>{
  if (url != 'sin web') {
    const Hurl = ('http://'+url); 

   Linking.canOpenURL(Hurl).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(Hurl);
   }
 }).catch(err => console.error('An error occurred', err));
   };
}



  render() {
        
       


    return (
          <View style={styles.lista}>
            <Slides/>

            <View style={[styles.cajainfo]}>
              <TouchableOpacity onPress={()=> this.callNumber('tel:3193289504')} style={[styles.llamada]}>  
                        
                <View style={styles.iconos}>
                  <Icon name={'ios-phone-portrait-outline'} size={30} color={'#898989'}/>
                  <Text style={styles.txtAction} > llamar </Text>
                </View>

                <View style={styles.infor}>
                  <Text style={styles.txtinfo} > {'3193289504'} </Text>
                </View>
             
              </TouchableOpacity>
                
              <TouchableOpacity   onPress={()=> this.whatsapp(3193289504,1)} style={styles.wiconos}>
                  <Image style={[styles.image]} source={require('./imgs/wicono.png')}/>
                  <Text style={styles.txtAction} > enviar mensaje </Text>
              
              </TouchableOpacity>
            </View>

             <View style={[styles.cajainfo]}>
              <TouchableOpacity onPress={()=> this.callNumber('tel:3197913842')} style={[styles.llamada]}>  
                        
                <View style={styles.iconos}>
                  <Icon name={'ios-phone-portrait-outline'} size={30} color={'#898989'}/>
                  <Text style={styles.txtAction} > llamar </Text>
                </View>

                <View style={styles.infor}>
                  <Text style={styles.txtinfo} > {'3197913842'} </Text>
                </View>
             
              </TouchableOpacity>
                
              <TouchableOpacity   onPress={()=> this.whatsapp(3197913842,1)} style={styles.wiconos}>
                  <Image style={[styles.image]} source={require('./imgs/wicono.png')}/>
                  <Text style={styles.txtAction} > enviar mensaje </Text>
              
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.cajainfo]} onPress={()=> this.sendMail('contacto@mako.guru')}>  
                                       
                  <View style={styles.iconos}>
                    <Icon name={'ios-mail-outline'} size={30} color={'#898989'}/>
                    <Text style={styles.txtAction} > enviar </Text>
                  </View>

                  <View style={styles.infor}>
                    <Text style={styles.txtinfo2} > {'contacto@mako.guru'.toLowerCase()} </Text>
                  </View>
           
            </TouchableOpacity>

            <TouchableOpacity style={[styles.cajainfo]}  onPress={()=> this.callBrowser('www.mako.guru')}>  
                                       
                  <View style={styles.iconos}>
                    <Icon name={'ios-globe-outline'} size={30} color={'#898989'}/>
                    <Text style={styles.txtAction} > visitar </Text>
                  </View>

                  <View style={styles.infor}>
                    <Text style={styles.txtinfo2} > {'www.mako.guru'.toLowerCase()} </Text>
                  </View>
           
            </TouchableOpacity>


            <View style={styles.labelBus}>
              <Text style={styles.txtLabel}>Desarrolladores</Text>
            </View>

            <Desarrolladores/>

            <View style={styles.labelBus}>
              <Text style={styles.txtLabel}>Patrocinadores</Text>
            </View>

            <ListaPatrocinadores/>

          </View>


    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
  },
labelBus:{
  backgroundColor: '#34c1bb',
  flexDirection: 'row',
  marginBottom: 5,
  height: 30
},



txtLabel:{
  flex: 1,
  fontSize: 15,
  marginHorizontal: 5,
  top: 2,
},




cajainfo:{
  flex: 1,
  flexDirection: 'row',
  borderBottomColor: '#C5C6C6',
  borderBottomWidth: 0.5,
},

iconos:{
  width: 50,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
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


txtinfo2:{
  //justifyContent: 'center',
  //alignItems: 'center',
  flex: 1,
  textAlign: 'right',
   fontSize: 16,
     paddingVertical: 10,
     flexWrap: 'nowrap', 
     textAlign: 'right',

},

image:{
height: '70%',
  resizeMode: Image.resizeMode.contain,
},




txtAction:{
  fontSize: 8,
  color: '#34c1bb'
},

});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */