/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import {CachedImage,ImageCacheProvider} from 'react-native-cached-image';

const {width}= Dimensions.get('window')

export default class ListEmpresas extends Component {
  
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
  <View style={styles.lista}>

    <FlatList
    horizontal={true}
    style={styles.lista}
        data={this.state.ds}
        renderItem={({item}) => {
 
    
       let url_img = 'https://www.mako.guru/srcApp/imgs/ciudades/'+item.id_ciudad+'.png'
          return(

            <TouchableOpacity onPress={()=> this.props.fun.cambiaCiudad(item.id_ciudad,item.nombre)} style={styles.ciudades}>
            	<Image  source={{uri : url_img}} style={styles.iconCiudades}/>
            	<Text style={[styles.textCiudad,{backgroundColor: item.color}]}>{item.nombre}</Text>
            </TouchableOpacity>
            );
        }}
      
        keyExtractor={item => item.id_ciudad}/>
     
          </View>


    
    );
  }
}

const styles = StyleSheet.create({

lista:{
backgroundColor: '#fff'

},
ciudades:{
  flex: 1,
  height: 80,
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  margin: 5

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
borderRadius: 5
},
});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */