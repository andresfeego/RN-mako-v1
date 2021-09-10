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

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class VChorasDomi extends Component<{}> {


  constructor(props) {
    super(props);
  
    this.state = {
      backDomi:'lightgray',
      colorVCHoras:'lightgray',
    };
  }





  render() {


      const domicilio =this.props.domicilio
      const costo =this.props.costo
      const vchoras =this.props.vchoras
      const colorCiudad =this.props.color

      let iconDomi = 'adjust'
      let txtDomi = 'Sin servicio a domicilio'
      let colorDomi = 'lightgray'
      if (domicilio == 1) {
        iconDomi = 'motorcycle'
        txtDomi = 'Domicilio: $'+costo+'\n valor aproximado'
        colorDomi = colorCiudad
        if (costo == '0') {
          txtDomi = 'Domicilio: sin costo'
        };
        
     }

      let iconVChoras = 'adjust'
      let txtVChoras = 'Sin servicio 24 horas'
      let colorVCHoras = 'lightgray'

      if (vchoras == 1) {
          iconVChoras = 'restore'
          txtVChoras = 'Prestamos servicio 24 horas'
          colorVCHoras = colorCiudad
      };

    return (
       
            <View style={styles.conte}>

              <View style={styles.domi}>
                <Icon name={''+iconDomi} size={50} color={colorDomi}/>
                <Text style={styles.txtinfo} > {txtDomi} </Text>
              </View>

              <View style={styles.VChoras}>
                <Icon name={''+iconVChoras} size={50} color={colorVCHoras}/>
                <Text style={styles.txtinfo} > {txtVChoras} </Text>
              </View>

            </View>
                
          


//adjust

 
      

    );
  }
}

const styles = StyleSheet.create({

conte:{
  flex: 1,
  height: 100,
  flexDirection: 'row',
},

domi:{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

VChoras:{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
});
