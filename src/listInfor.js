/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, Share, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Infor from './Infor.js';

const {width}= Dimensions.get('window')

export default class ListInfor extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      codigo: this.props.cod,
      refreshing: false,
      ds: '',

      };
  }



componentWillMount(){

          this.getPromos();
} 



  
getPromos(){
   

    return fetch('http://www.mako.guru/listadosApp/returnInfos.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      codigo: this.props.cod,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         console.warn('antes', responseJson);
         
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


handlePress(empresa){
  if (empresa.activo != 0) {
this.contarVisita(empresa.codigo);

Actions.DetalleVenta({empresa});
}
}

  facebookShare(idInfo) {
    let mensa = 'https://mako.guru/directorio/directorio3.php?id='+this.state.codigo+'&idInfo='+idInfo;

            Share.share(
            {
                
              message: mensa
            
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));

  }



  render() {
        
       


    return (
  <View style={styles.contenido}>
  <View style={styles.lista}>

    <FlatList
    
    style={styles.lista}
        data={this.state.ds}
        renderItem={({item}) => {
 
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/infoIcon.png';
       
          return(

          <Infor codigo={this.state.codigo} item={item}/>

            );
        }}
       rol={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }
        keyExtractor={item => item.orden}/>
     
          </View>
        </View>


    
    );
  }
}

const styles = StyleSheet.create({

lista:{
width: '100%',
},

  promo:{
  flex: 1,
  flexDirection: 'column',

},

titulo:{
	width: '100%',

},

txttitulo:{
fontSize: 19,
},


txtPorciento:{
fontSize: 17,
alignSelf: 'center',
textAlign: 'center' ,
color: '#fff',
fontWeight: 'bold' ,
},

logo:{
  width: ((width/2)-12),
  height: ((width/2)-12),
  alignItems: 'center',
  justifyContent: 'center',
},

contPromos:{
  position: 'absolute',
  flex: 1,
  backgroundColor: 'red',
  top: 0,
  right: 0,
  flexDirection: 'row',
},

contPromo:{

  backgroundColor: '#fff',
  flex: 1,
  justifyContent: 'center' ,
  alignItems: 'center' ,
  marginTop: 25,
  marginLeft: 20,
  marginRight: 10,
  borderColor: 'lightgray',
  borderWidth: 0.5,
  flexDirection: 'column',
  elevation: 5,

},


txtPromo:{
fontSize: 15,
textAlign: 'left',
flex: 1,
padding: 10,
},

promoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#f54848',
marginLeft: 5,
},

infoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#79DB48',
marginLeft: 5,
},

vistoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#00A0E3',
marginLeft: 5,
},

imgPromo:{
width: 40,
height: 40,
},

image:{
    width: 40,
    height: 40,
    borderWidth: 0,
    
},

viewImg:{
    width: 40,
    height: 40,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: '#79DB48',
    top: 10,
    left: 0,
    elevation: 9,
    position: 'absolute',
justifyContent: 'center' ,
},


texto:{
  flex: 1,
},

txttitulo:{
  fontWeight: 'bold',
  fontSize: 13,
  textAlign: 'center',
  backgroundColor: 'lightgray',
  width: '100%',
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
compartir:{
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#4177F6',
  flexDirection: 'row',
  width: "100%",
  padding: 3,
  marginHorizontal: 10
    
},

});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */