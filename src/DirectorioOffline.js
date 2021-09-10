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
  FlatList,
  ScrollView,
  Alert,
  BackAndroid,
  TextInput,
  RefreshControl,
  Dimensions,
  Keyboard,
  NetInfo,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import ListaOffline from './ListaOffline.js';
import CategoriasP from './CategoriasP.js';
import ListaMenuCiudadesOffline from './ListaMenuCiudadesOffline.js';

const {height}= Dimensions.get('window')


var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'comerci.db'})


export default class DirectorioOffline extends Component<{}> {


constructor(props) {
  super(props);

  this.state = {
  
    data: this.props.data,
    ciudad: 0,
    lblCiudad: '',
    busRazon: '',
    busServicios: '',
    busCategoria: '',
    lblBusCategoria:'',
  };

   
}


//........................................DID AND WILL MOUNT METHOD ..................................



componentWillMount(){
       BackAndroid.addEventListener('hardwareBackPress', this.ok);

}


componentWillUnmount(){

  BackAndroid.removeEventListener('hardwareBackPress', this.ok);

  
}
 


ok(){
 if (Actions.currentScene == 'DirectorioOffline') {

BackAndroid.exitApp();
 }
}



//............................FUNCIONES PARA generar carta presentacion  .............................




//................................................................................... .............................


cambiaCategoria(cat,lblCat){
  
  let that = this;
  setTimeout(function() {
          that.setState({
      busCategoria: cat,
      lblBusCategoria: lblCat,
  });

        }, 1000);

  
}


cambiaCiudad(ciud, lblCiudad){
  this.setState({
    ciudad: ciud,
    lblCiudad: lblCiudad,
  })

}


//............................FUNCIONES PARA RENDER .............................


  render() {
    
      return (
       

      <View style={styles.container}> 
		  
        <View style={styles.barraBusqueda}>
          <Icon name="search" size={30} style={styles.iconLupa} />
          <TextInput ref={ref => inputServicios = ref} placeholder="Busca en Boyacá con MAKO..." placeholderTextColor="gray"  onChangeText={busServicios => this.setState({busServicios})} style={styles.inputBusqueda2}>{this.state.busServicios}</TextInput>
          {this.state.busServicios != '' ?
            <Icon name="highlight-off" size={35} style={styles.labelIcon}  onPress={() =>this.setState({ busServicios: '',})} />
            : null 
          }
        </View>

        <ScrollView style={styles.scrollCont}>
          <View style={styles.contenedorCiu}>
            <Text style={styles.tituloPromos}> En que ciudad lo buscas </Text>
            <ListaMenuCiudadesOffline fun={this}/> 
          </View>     

          <View style={styles.cat}>
            <Text style={styles.tituloPromos}> Recuerda que puedes filtrar por catgorías </Text>
            <CategoriasP appFun={this} />
          </View> 


 {this.state.busServicios || this.state.lblBusCategoria ||  this.state.lblCiudad?
            

      <View style={styles.contenedorCiu}>
 
            <Text style={styles.tituloPromos}> Filtros aplicados </Text>
       <View style={styles.contenedorFiltros}>

        {this.state.busServicios ?

       <View style={styles.labelBus}>
        <Text style={styles.txtLabel}>{this.state.busServicios}</Text>
        <TouchableOpacity onPress={busServicios => this.setState({busServicios:''})}>
          <Icon name="highlight-off" size={25} style={styles.labelIcon} />
        </TouchableOpacity>
       </View>

       : null}

        {this.state.lblBusCategoria ?

       <View style={styles.labelBus}>
        <Text style={styles.txtLabel}>{this.state.lblBusCategoria}</Text>
        <TouchableOpacity onPress={()=> this.cambiaCategoria('','')}>
          <Icon name="highlight-off" size={25} style={styles.labelIcon} />
        </TouchableOpacity>
       </View>

       : null}

        {this.state.lblCiudad ?

       <View style={styles.labelBus}>
        <Text style={styles.txtLabel}>{this.state.lblCiudad}</Text>
        <TouchableOpacity onPress={()=> this.cambiaCiudad(0,'')}>
          <Icon name="highlight-off" size={25} style={styles.labelIcon} />
        </TouchableOpacity>
       </View>

       : null}

      </View>
      </View>
            : null
          }


          <View style={styles.lista}>
            <ListaOffline  style={styles.lista} busKey={this.state.busServicios} busCat={this.state.busCategoria} busCiu={this.state.ciudad}/>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Image style={styles.logoMako} source={require('./imgs/logomako1.png')}/>
          <Text style={styles.tituloPromos}> .:MAKO:. Directorio sin internet </Text>
        </View>
        
      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  height: '100%',
  backgroundColor: '#F5F6F7',
},

scrollCont:{
  height: (height*1),
},


lista:{
  flex: 1,
  marginTop: 5,
  width: '100%',
},

barraBusqueda:{

width: '100%',
height: 40,
flexDirection: 'row',

},

iconoMenu:{
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center' ,
  backgroundColor: '#34c1bb'

},

iconLupa:{
  alignItems: 'center',
  justifyContent: 'center',
  top: 4,
  paddingHorizontal: 2,
},


inputBusqueda2:{
 width: '100%',
  paddingLeft: 4,
  color: 'gray',
  flex: 1,
  height: 45,
  fontSize: 17

},



cat:{
  width: '100%',
  backgroundColor: '#fff',
  paddingBottom: 10,
  marginVertical: 10,
  elevation: 4


},

contenedorCiu:{
marginVertical: 5,
paddingVertical: 5,
backgroundColor: '#fff',
elevation: 4

},

tituloPromos:{
  fontFamily: 'CaviarDreams',
  margin: 3,
  fontSize: 10,
  color: '#000',
  margin: 5,
},

footer:{
  backgroundColor: '#848688',
  height: 50,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center' ,
  paddingHorizontal: 15,
},

  logoMako:{
    width: 40,
    height: 40,
    zIndex: 50
  },

labelBus:{
  backgroundColor: '#34c1bb',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: 3,
  borderRadius: 20,
},

txtLabel:{
  fontSize: 15,
  marginHorizontal: 5,
  top: 5,
},


labelIcon:{
  height: 30,
  width: 40,
  top: 3,
  textAlign: 'center',
},

contenedorFiltros:{
marginVertical: 5,
paddingVertical: 5,
backgroundColor: '#fff',
  flexDirection: 'row' ,
  flexWrap: 'wrap'
},

});

