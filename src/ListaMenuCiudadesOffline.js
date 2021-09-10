/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions,ScrollView} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import {CachedImage,ImageCacheProvider} from 'react-native-cached-image';

const {width}= Dimensions.get('window')

export default class ListaMenuCiudadesOffline extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      refreshing: false,
      ds: '',
      actu: 0,
      
      };

     
  }



componentWillMount(){

          this.getCiudades();
this.actualizar();
} 





getCiudades(){
   

    return fetch('http://www.mako.guru/listadosApp/returnMenuCiudades.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
     
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         //console.warn('antes', responseJson);
         
          if (responseJson != 0) {
            data=[];
            data= responseJson;
            this.setState({
              ds: data,
            })

          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}

actualizar(){


     this.getCiudades().then(() =>{
  
  let that = this;

  setTimeout(function() {
        that.actualizar();
        }, 1000);
  })

}

_onRefesh(){
  
  this.setState({
    refreshing: true,
  });
     this.getEmpresas(this.state.ciudad, this.state.busRazon, this.state.busServicios , this.state.busCategoria).then(() =>{
    this.setState({
      refreshing:false,
    })
  })

  
 
}


MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}





  render() {
        
       


    return (
  <ScrollView horizontal={true} style={styles.lista}>


            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(0,'Todas')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(34,34,34)'}]}>Todas</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(1,'Sogamoso')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(254,148,63)'}]}>Sogamoso</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(2,'Duitama')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(235,44,152)'}]}>Duitama</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(3,'Tunja')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(34,168,216)'}]}>Tunja</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(4,'Paipa')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(179,216,34)'}]}>Paipa</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(5,'Villa de Leyva')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(182,121,214)'}]}>Villa de Leyva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(6,'Chiquinquira')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(236,83,83)'}]}>Chiquinquira</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(7,'Iza')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(247,210,14)'}]}>Iza</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(8,'Punta Larga')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(148,10,47)'}]}>Punta Larga</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(9,'Nobsa')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(63,175,48)'}]}>Nobsa</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(10,'Tibasosa')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(130,207,237)'}]}>Tibasosa</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(11,'Ramiriquí')} style={styles.ciudades}>
            	<Text style={[styles.textCiudad,{backgroundColor: 'rgb(66, 109, 197)'}]}>Ramiriquí</Text>
            </TouchableOpacity>

          </ScrollView>


    
    );
  }
}

const styles = StyleSheet.create({

lista:{
backgroundColor: '#fff',
flexDirection: 'row' ,

},
ciudades:{
  flex: 1,
  height: 20,
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  margin: 5,
  

},

iconCiudades:{
  height: 50,
  resizeMode: Image.resizeMode.stretch,
  width: 100,
  
},

textCiudad:{
color: '#fff',
textAlign: 'center' ,
paddingHorizontal: 10,
borderRadius: 5,
height: '100%',
alignItems: 'center' ,
justifyContent: 'center' ,
},
});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */