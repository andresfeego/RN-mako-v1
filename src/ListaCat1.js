/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,Text,TouchableOpacity,View,Image} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';


export default class ListEmpresas extends Component {
  
 constructor(props) {
    super(props);
     this.state = {
    
      refreshing: false,
      ds: '',
      cat: this.props.cat,
      lista: this.props.lista,
      
      };

     
  }


componentWillMount(){

          this.getCat(this.props.cat,this.props.lista);

} 

  
componentWillReceiveProps(nextProps: Props) {
  this.setState({
        cat: nextProps.cat,
      lista: nextProps.lista,
          })
 
    this.getCat(nextProps.cat, nextProps.lista);

  }



getCat(cat,lista){
   

    return fetch('http://www.mako.guru/listadosApp/returnCat1.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      cat: cat,
      lista: lista,

    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
        // console.warn('antes', responseJson);
         
         
            data=[];
            data= responseJson;
            this.setState({
              ds: data,
            })
      })

.catch((error) => {
        console.warn(error);
      }); 
}



_onRefesh(){
  
  this.setState({
    refreshing: true,
  });
     this.getCat().then(() =>{
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
    style={styles.lista}
        data={this.state.ds}
        renderItem={({item}) => {
 			
 			let auxicat = item.idcategorias;
 			switch(this.props.lista){
 				case 1: auxicat= item.idsubcategoria1; 
 				break;

 				case 2: auxicat= item.idsubcategoria2;
 				break;
 			}
     		
     		//console.warn(7,auxicat,(this.props.lista+1));
       
          return(

            <TouchableOpacity style={styles.empresa}  onPress={() => this.props.appFun.llenaCat(7,auxicat,(this.props.lista+1),this.MaysPrimera(item.nombre.toLowerCase()))} >

                    <Text style={styles.descripcion}> {this.MaysPrimera(item.nombre.toLowerCase())} </Text>
                  
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
        keyExtractor={item => item.idcategorias}/>
     
          </View>


    
    );
  }
}

const styles = StyleSheet.create({

lista:{
width: '100%',

},

  empresa:{
  width: '100%',
  backgroundColor: '#fff',
  height: 40,
  marginBottom:0,
  flexDirection: 'row',
  elevation   : 5,
  borderBottomColor: 'lightgray',
  borderBottomWidth: 1,
  alignItems: 'center',
},

ciudad:{
  width: 4,
  height: 60,
},

logo:{
  width: 60,
  height: 60,
},

image:{
    width: '100%',
    height: '100%',
    borderWidth: 2,

},

texto:{
  flex: 1,
},

nombre:{
  fontWeight: 'bold',
  fontSize: 15,
},

descripcion:{
  color: '#34C1BB',
  fontSize: 15,
  flex: 1,
},



  ver:{
    width: 12,
    height: 30,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',

  },

});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */