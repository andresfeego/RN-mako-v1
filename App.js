

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
  ListView,
  Button,
  TouchableOpacity,
  AsyncStorage,
  Linking
} from 'react-native';

import Home from './src/Home.js';
import DetalleVenta from './src/DetalleVenta.js';
import Slides from './src/Slides.js';
import listSort from './src/listSort.js';
import listPromos from './src/listPromos.js';
import listInfos from './src/listInfor.js';
import Galeria from './src/Galeria.js';

import Inicio from './src/Inicio.js';
import ViewLogin from './src/ViewLogin.js';
import RecupPass from './src/RecupPass.js';
import CambioPass from './src/CambioPass.js';
import subeImagenUsuario from './src/subeImagenUsuario.js';
import DirectorioOffline from './src/DirectorioOffline.js';

import {Actions, Scene, Router} from 'react-native-router-flux';



export default class App extends Component<{}>{


  render() {
    return <Router>

      <Scene key="root">
      <Scene key="login">
        <Scene key="Inicio" component={Inicio} hideNavBar/ >
        <Scene key="DirectorioOffline" component={DirectorioOffline} hideNavBar/ >
        <Scene key="ViewLogin" component={ViewLogin} hideNavBar/ >
        <Scene key="RecupPass" component={RecupPass} hideNavBar/ >
        <Scene key="CambioPass" component={CambioPass} hideNavBar/ >
        <Scene key="subeImagenUsuario" component={subeImagenUsuario} hideNavBar/ >
      </Scene>


        <Scene key="Home" component={Home} hideNavBar/ >
        <Scene key="DetalleVenta" component={DetalleVenta} hideNavBar={Platform.OS === 'android'}/>        
        <Scene key="listSort" component={listSort} hideNavBar={Platform.OS === 'android'}/>        
        <Scene key="listPromos" component={listPromos} hideNavBar={Platform.OS === 'android'}/>        
        <Scene key="listInfos" component={listInfos} hideNavBar={Platform.OS === 'android'}/>        
        <Scene key="Slides" component={Slides} hideNavBar={Platform.OS === 'android'}/>        
        <Scene key="Galeria" component={Galeria} hideNavBar={Platform.OS === 'android'}/>        
      </Scene>
    </Router>
  }
}

