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


export default class Empresa extends Component<{}> {

  constructor(props) {
    super(props);
  
    this.state = {

      nombre: this.props.empresa.nombre, 
      descripcion: this.props.empresa.descripcion,
      logo: this.props.empresa.url_logo,
      ciudad: this.props.empresa.id_ciudad,
    };

    
  }









  render() {
    const txt0 = 'https://www.mako.guru/directorio/logos/RNNXPG4K.png'
    const txt1 = 'https://www.mako.guru/registro/imagenes/logo.png'
    const txt2 = 'IN•PACTO PUBLICITARIO'
    const txt3 = 'Sogamoso'
    const posit = 'Asesor comercial'
    const label1 = 'Mis ventas'
    let label2 = 'Activo'






   
    let color='lightgray';

        
       
        switch(this.state.colorCiudad){
          case '1': ciudad='Sogamoso';color = 'rgb(255,159,63)';break;
          case '2': ciudad='Duitama';color = 'rgb(235,44,152)';break;
          case '3': ciudad='Tunja';color = 'rgb(34,168,216)';break;
          case '4': ciudad='Paipa';color = 'rgb(179,216,34)';break;
          case '5': ciudad='Villa de Leyva';color = 'rgb(182,121,214)';break;
          case '6': ciudad='Chiquinquira';color = 'rgb(236,83,83)';break;
        } 

    let colortxtFecha = color
    let colorFondoFecha = color
    let colorEstado = '#fff'
      if (this.props.vent.estado == 3) {
        colorEstado = '#E1E1E1'
        colortxtFecha = color
        colorFondoFecha = color
      };

   

    
    const backEstado={
      backgroundColor: colorEstado,
      
    };


    
    
    if (this.props.vent.estado == 1 || this.props.vent.estado == 2) {
      colortxtFecha = '#fff'
      colorFondoFecha = '#EC5353'
    };

    const fecha={
      backgroundColor: colorFondoFecha,
      
    };

      const txtFecha={
        color: colortxtFecha,
    };


    return (
       


        <View style={[styles.empesa, backEstado]}>

        
          
        	<View style={[styles.logo]}>
        		<Image></Image>
        	</View>
        	
        	<View style={[styles.empesa]}>
       		    <Text> {this.state.nombre} </Text>
    			<Text> {this.state.descripcion} </Text>
        	</View>
        	
        	<View style={[styles.empesa]}>
        	</View>

        </View>





 
      

    );
  }
}

const styles = StyleSheet.create({

empresa:{
  backgroundColor: '#fff',
  height: 80,
  marginTop: 10,
  flexDirection: 'column',
  elevation   : 5,
  backfaceVisibility: 'hidden' ,
},

up:{
  flexDirection: 'row' ,
  alignItems: 'center' ,
  height: 20,

},

fecha:{
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  top: 0,
}, 


txtFecha:{
  fontSize: 11,
},

down:{
  flex: 1,
  flexDirection: 'row',
  marginHorizontal: 5,
  justifyContent: 'center' ,
},
  
izq:{
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginHorizontal: 10,
  justifyContent: 'center',
},


der:{
  flex: 2,
  justifyContent: 'flex-end' ,
  alignItems: 'center',
  flexDirection: 'row',
},


txt0:{
  fontWeight: 'bold',
  fontSize: 13,
  color: '#fff',
  flex: 1,
  textAlign: 'center',
},

txt1:{
  fontWeight: 'bold',
  fontSize: 15,
  color: 'gray',
},

txt2:{
  fontWeight: 'bold',
  fontSize: 18,
  color: '#00A0E3',

},

txt3:{
  fontWeight: 'bold',
  fontSize: 10,
  color: '#009846',

},

iconos:{
  width: 40,
  height: 40,
  margin: 5,
  marginTop: 10 ,

},

iconos2:{
  width: 30,
  height: 30,
  margin: 5,
  marginTop: 10  
},

iconoW:{
  width: 30,
  height: 30,
  borderRadius: 50,
  margin: 5,
},

});
