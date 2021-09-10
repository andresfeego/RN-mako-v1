/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

const {width}= Dimensions.get('window')

export default class ListaPatrocinadores extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      refreshing: false,
      ds: '',
      
      };

     
  }



componentWillMount(){

          this.getEmpresas(0);
          this.actualizar();

} 


actualizar(){


     this.getEmpresas(1).then(() =>{
  
  let that = this;

  setTimeout(function() {
        that.actualizar();
        }, 5000);
  })

}



getEmpresas(id){
   

    return fetch('http://www.mako.guru/listadosApp/listaPatrocinadores.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: '',
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

          } else{
            criterios = "Sin resultados";
             data=[{"0":"0","orden":"0","1":"2018-03-02 00:34:00","fechaRegistro":"2018-03-02 00:34:00","2":"0","oculto":"0","3":"0","activo":"0","4":"CMWSRMJN","codigo":"CMWSRMJN","5":"Sin Resultados","nombre":"Sin Resultados","6":criterios,"descripcion":criterios,"7":"Carrera 1 # 1 - 01","direccion":"Carrera 1 # 1 - 01","8":"361","barrio":"361","9":"1","vc_horas":"1","10":"0","domicilio":"0","11":"0","costo_domicilio":"0","12":"sin web","pagina_web":"sin web","13":"logos\/cat\/nohay.png","url_logo":"logos\/cat\/nohay.png","14":"0","categoria":"0","15":"Nada","palabras_clave":"Nada","16":"0","ubicacion_maps":"0","17":"4","visto":"4","18":"0","listado":"0","19":"0","cantidad_de_votos":"0","20":"0","nuemro_de_votantes":"0","21":"1","tipo_comercio":"1","22":"5.5348375","lat":"5.5348375","23":"-73.3607735","lng":"-73.3607735","24":"rgb(52,193,187)","color":"rgb(52,193,187)"}];
            this.setState({
              ds: data,
            })
           
          };
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}



_onRefesh(){
  
  this.setState({
    refreshing: true,
  });
     this.getEmpresas().then(() =>{
    this.setState({
      refreshing:false,
    })
  })

  
 
}


MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}


handlePress(empresa){
  if (empresa.activo != 0) {
Actions.DetalleVenta({empresa});
}
}

  render() {
        
       


    return (
  <View style={styles.lista}>

    <FlatList
    numColumns={2}
    style={styles.lista}
        data={this.state.ds}
        renderItem={({item}) => {
 
      let color=item.color;
      let opacit = {opacity: 1};  

        if (item.activo == 0) {
          color='lightgray';  
          opacit = {opacity: 0.2};  
        };

        const backColor = {backgroundColor: color};
        const borderColor = {borderColor: color};
        const Color = {color: color};
        const borderBottomColor = {borderBottomColor: color};


        const urllogo = 'https://www.mako.guru/directorio/'+item.url_logo;
       
          return(

            <TouchableOpacity style={[styles.empresa,borderBottomColor]}  onPress={() => this.handlePress(item)} >

                  
                  

                  <View style={[styles.logo]}>
                    <Image style={[styles.image, borderColor, opacit]} source={{ uri : urllogo}}/>
                  </View>
                  
                  <View style={[styles.texto]}>
                    <Text style={[styles.nombre, Color]}> {item.nombre.toUpperCase()} </Text>
                    <Text style={styles.descripcion}> {this.MaysPrimera(item.descripcion.toLowerCase())} </Text>
                  </View>
                  
               

                  <View style={[styles.ver]}>
                    <Text style={{color: 'gray'}}>{">"}</Text>
                  </View>


            </TouchableOpacity>

            );
        }}
        refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }
        keyExtractor={item => item.orden}/>
     
          </View>


    
    );
  }
}

const styles = StyleSheet.create({

lista:{
width: '100%',
},

  empresa:{
  width: '47%',
  backgroundColor: '#fff',
  height: ((width/2)+55),
  margin: 5,
  borderTopColor: 'lightgray',
  borderTopWidth: 0.5,
  borderBottomWidth: 5,
  elevation   : 5,

},



logo:{
  width: ((width/2)-12),
  height: ((width/2)-12),
  alignItems: 'center',
  justifyContent: 'center',
},

image:{
    width: '100%',
    height: '100%',
    borderWidth: 0,
    
},

texto:{
  flex: 1,
},

nombre:{
  fontWeight: 'bold',
  fontSize: 13,
  textAlign: 'center',
},

descripcion:{
  color: 'gray',
  fontSize: 10,
  textAlign: 'center',
},



  ver:{
    width: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },

});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */