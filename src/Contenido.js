/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,View,Text} from 'react-native';
import ListEmpresas from './ListEmpresas.js';
import ListaPatrocinadores from './ListaPatrocinadores.js';
import ListaCat1 from './ListaCat1.js';
import Acerca from './Acerca.js'
import ListaPromosGrande from './ListaPromosGrande.js'
import ListaInforGrande from './ListaInforGrande.js'

//import {Actions} from 'react-native-router-flux';


export default class Contenido extends Component {
  
  constructor(props) {
    super(props);

     this.state = {
      contenido: this.props.conte.contenido,
      ciudad: this.props.conte.ciudad,
       busRazon: this.props.busRazon,
      busServicios: this.props.busServicios,
      busCategoria: this.props.busCategoria,
        ds: '',
    };

     
  }

cambiaContenido(conte){
  this.props.cambiaContenido(conte);

  
}

  generaContenido(){
    const Empresa = <ListEmpresas style={styles.container} ciudad={this.props.conte.ciudad} busRazon={this.props.conte.busRazon} busServicios={this.props.conte.busServicios} busCategoria={this.props.conte.busCategoria}  />;
    const Recomendados = <ListaPatrocinadores style={styles.container}  />;
    const Eventos = <ListaPromosGrande ciudad={this.props.conte.ciudad} busRazon={this.props.conte.busRazon} busServicios={this.props.conte.busServicios} busCategoria={this.props.conte.busCategoria}  />;
    const Noticias = <ListaInforGrande ciudad={this.props.conte.ciudad} busRazon={this.props.conte.busRazon} busServicios={this.props.conte.busServicios} busCategoria={this.props.conte.busCategoria}  />;
    const Adopta = <Text style={styles.txt}>En este espacio encontraras gatitos y perritos en busca de un hogar.  Esperalo muy pronto...</Text>;
    const Patrocinadores = <Acerca />;
    let Cat = <ListaCat1 appFun={this.props.appFun} cat={this.props.cat} lista={this.props.lista}/>;

    if (this.props.conte.contenido == 7 && this.props.lista == 3) {
      this.props.appFun.cambiaCategoria(this.props.cat,this.props.lblCat)
      
    } 

    let contenido;


     switch (this.props.conte.contenido){
 

      case 2: contenido = Recomendados;
      break;

      case 3: contenido = Eventos;
      break;

      case 4: contenido = Noticias;
      break;

      case 5: contenido = Adopta;
      break;

      case 6: contenido = Patrocinadores;
      break;

      case 7: contenido = Cat;
      break;

      default: contenido = Empresa;
      break;
     }

     return contenido;

  }



  render() {

    return (<View>{this.generaContenido()}</View>)
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
  },

  txt:{
    textAlign: 'center',
  }
});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */