import React from 'react';
import { StyleSheet, Text,TextInput, View, Image,TouchableOpacity,Animated,Keyboard,AsyncStorage,ScrollView,Dimensions,BackAndroid } from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Contenido from './Contenido.js';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Header from './Header.js'
import CategoriasP from './CategoriasP.js';
import ListaPromosPrincipal from './ListaPromosPrincipal.js';
import ListaMenuCiudades from './ListaMenuCiudades.js';
import Menu from './Menu.js';
import ListaSorteosPrincipal from './ListaSorteosPrincipal.js';
import UpdateDBNotice from './UpdateDBNotice';

const {height}= Dimensions.get('window')




export default class Home extends React.Component {

constructor(props) {
  super(props);

  this.state = {
    isLoading: false,
    ciudad: 0,
    lblCiudad: '',
    busRazon: '',
    busServicios: '',
    busCategoria: '',
    lblBusCategoria: '',
    contenido: 0,
    auxiCat: 0,
    auxiListaCat: 0,

    color: 'rgb(25,25,25)',
    topCiudades: new Animated.Value(-530),
    topBusRazon: new Animated.Value(-100),
    topBusServicios: new Animated.Value(-100),

    leftMenu: new Animated.Value(-300),
    estadoMenu:0,
    user: this.props.user,
  };

    AsyncStorage.setItem('user', this.props.user);
  AsyncStorage.setItem('pass', this.props.pass);
}


componentWillMount(){
       BackAndroid.addEventListener('hardwareBackPress', this.ok);

}


componentWillUnmount(){

  BackAndroid.removeEventListener('hardwareBackPress', this.ok);

  
}
 


ok(){
 if (Actions.currentScene == 'Home') {

BackAndroid.exitApp();
 }
}



abrirMenu(){
  this.setState({
    estadoMenu: 1
  })
   
Animated.timing(                  // Animate over time
      this.state.leftMenu,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 200,              // Make it take a while
      }
    ).start();       

}

cerrarMenu(){
  this.setState({
    estadoMenu: 0
  })
   
Animated.timing(                  // Animate over time
      this.state.leftMenu,            // The animated value to drive
      {
        toValue: -300,                   // Animate to opacity: 1 (opaque)
        duration: 200,              // Make it take a while
      }
    ).start();       

}



cambiaCiudad(ciud, lblCiudad){
  this.setState({
    ciudad: ciud,
    lblCiudad: lblCiudad,
  })

  this.cerrarCiudades();
}

cambiaContenido(conte){
  this.setState({
    contenido: conte,
  })



}

llenaCat(conte,idCat,idLista,lblCat){
  this.setState({
    contenido: conte,
    auxiCat: idCat,
    auxiListaCat: idLista,
    lblBusCategoria: lblCat,

  })

}




cambiaCategoria(cat,lblCat){
  
            this.cambiaContenido(0);
  let that = this;
  setTimeout(function() {
          that.setState({
      busCategoria: cat,
      lblBusCategoria: lblCat,
  });

        }, 1000);

  
}
 

reiniciarBusquedas(cat){
  
            this.cambiaContenido(0);
  let that = this;
  setTimeout(function() {
          that.setState({
    ciudad: 0,
    busRazon: '',
    busServicios: '',
    busCategoria: '',
    auxiCat: 0,
    auxiListaCat: 0,

  });

        }, 1000);

  
}
 



abrirBuscarRazon(){
    this.setState({
      estadoBR:1,
    })

  if (this.state.estadoMC == 1) {
    this.cerrarCiudades();
  };

  if(this.state.topBusServicios != '-80'){
    this.cerrarBuscarServicios();
  }
Animated.timing(                  // Animate over time
      this.state.topBusRazon,            // The animated value to drive
      {
        toValue: 20,                   // Animate to opacity: 1 (opaque)
        duration: 800,              // Make it take a while
      }
    ).start();       
  
  inputRazon.focus();
 // this.refs.scrollView.scrollTo({x:0,y:244,animated:true});
}



abrirBuscarServicios(){
  if (this.state.estadoMC == 1) {
    this.cerrarCiudades();
  };
   if(this.state.topBusRazon != '-80'){
   this.cerrarBuscarRazon();
 }
  this.setState({
      estadoBS:1,
    })
Animated.timing(                  // Animate over time
      this.state.topBusServicios,            // The animated value to drive
      {
        toValue: 20,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start();     

  inputServicios.focus();
  
}


abrirCiudades(){

   if(this.state.topBusServicios != '-80'){
    this.cerrarBuscarServicios();
  }
   if(this.state.topBusRazon != '-80'){
   this.cerrarBuscarRazon();
 }

  this.setState({
    estadoMC: 1
  })
   
Animated.timing(                  // Animate over time
      this.state.topCiudades,            // The animated value to drive
      {
        toValue: 30,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start();       

}

cerrarCiudades(){
  this.setState({
    estadoMC: 0
  })
   
Animated.timing(                  // Animate over time
      this.state.topCiudades,            // The animated value to drive
      {
        toValue: -530,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start();       

}



cerrarBuscarRazon(){
   this.setState({
      estadoBR:0,
    })
  Keyboard.dismiss();
Animated.timing(                  // Animate over time
      this.state.topBusRazon,            // The animated value to drive
      {
        toValue: -110,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start();       
}

cerrarBuscarServicios(){
   this.setState({
      estadoBS:0,
    })
  Keyboard.dismiss();
Animated.timing(                  // Animate over time
      this.state.topBusServicios,            // The animated value to drive
      {
        toValue: -100,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start();       
}








  render() { 


    let { leftMenu} = this.state;


     let conte = {
      ciudad: this.state.ciudad,
      contenido: this.state.contenido,
      busRazon: this.state.busRazon,
      busServicios: this.state.busServicios,
      busCategoria: this.state.busCategoria,

    }
    let { topBusRazon } = this.state;
    let { topBusServicios } = this.state;
    let { topCiudades} = this.state;

    let conteni = this.state.contenido;
    let colorIcono1 = '#333';
    let colorIcono2 = '#333';
    let colorIcono3 = '#333';
    let colorIcono4 = '#333';
    let colorIcono5 = '#333';
    let colorIcono6 = '#333';

    switch(conteni){

      case 0:  colorIcono1 = '#fff';
      break;

      case 2:  colorIcono2 = '#fff';
      break;
      
      case 3:  colorIcono3 = '#fff';
      break;
      
      case 4:  colorIcono4 = '#fff';
      break;
      
      case 5:  colorIcono5 = '#fff';
      break;
      
      case 6:  colorIcono6 = '#fff';
      break;
      

    }
    

     let fondoFooter = require('./imgs/fondoMenu.png');

    

    return (
      <View style={styles.container}>
      

      {this.state.estadoMenu == 1?
      <TouchableOpacity style={styles.fondoMenu} onPress={() =>this.cerrarMenu()} />
      :
      null }


      <View style={styles.overBusquedas2}/>
      
      <Animated.View style={[styles.menu,{left: leftMenu}]}>
        <Menu fun={this} user={this.state.user} />
      </Animated.View>


      <View style={styles.barraBusqueda}>
        
        <TouchableOpacity style={styles.iconoMenu} onPress={() =>this.abrirMenu()}>
          <Icon name="menu" size={30} style={styles.iconBus} />
        </TouchableOpacity>
          
        <Icon name="search" size={30} style={styles.iconLupa} />
        <TextInput ref={ref => inputServicios = ref} placeholder="Que buscas en Boyacá..." placeholderTextColor="gray"  onChangeText={busServicios => this.setState({busServicios})} style={styles.inputBusqueda2}>{this.state.busServicios}</TextInput>
        {this.state.busServicios != '' ?
            <Icon name="highlight-off" size={35} style={styles.labelIcon}  onPress={() =>this.setState({ busServicios: '',})} />
            : null 
        }
      </View>




<UpdateDBNotice />

      <ScrollView style={styles.scroll} ref={ref => scrollV = ref}>

      <View style={styles.section1} >

        {this.state.busServicios == '' && this.state.busCategoria == '' && this.state.ciudad == 0?

          <Header style={styles.slide} appFun={this}/>
        : 
          null
        }


          
          {this.state.busServicios != '' || this.state.busCategoria != '' || this.state.ciudad != 0?
          <View style={styles.contenedorCiu}>
          
            <Text style={styles.tituloPromos}> En que ciudad lo buscas </Text>
            <ListaMenuCiudades fun={this}/> 

          </View>                        

          : 
          null
        }



  
        <View style={styles.cat}>
        
          {this.state.busServicios != '' || this.state.busCategoria != '' || this.state.ciudad != 0?
            <Text style={styles.tituloPromos}> Recuerda que puedes filtrar por catgorías </Text>
          : null
          }

          <CategoriasP appFun={this} />
        </View> 

      </View>
      

          {this.state.busServicios == '' && this.state.busCategoria == '' && this.state.ciudad == 0 && this.state.contenido == 0?
            <ListaSorteosPrincipal/>
          
            : null 
          }

          {this.state.busServicios == '' && this.state.busCategoria == '' && this.state.ciudad == 0 && this.state.contenido == 0?
            <ListaPromosPrincipal/>
           : null 
          }


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
          <Contenido  conte={conte} appFun={this} cat={this.state.auxiCat} lista={this.state.auxiListaCat} lblCat={this.state.lblBusCategoria}/>
        </View>


      </ScrollView>

        <View  style={styles.footer}>


        <Image source={fondoFooter} style={[styles.fondo1]} />


          <TouchableOpacity  onPress={()=> this.cambiaContenido(0)}  style={[styles.footerIcon]}>
            <Icon name="import-contacts" size={30} color={colorIcono1} style={styles.footerIcon2}/>
            <Text  ellipsizeMode ={'tail'} style={[styles.texto,{color: colorIcono1}]}>Directorio telefónico</Text>
          </TouchableOpacity>


          <TouchableOpacity  onPress={()=> this.cambiaContenido(2)} style={[styles.footerIcon]}>
            <Icon name="beach-access" size={30} color={colorIcono2} style={styles.footerIcon2}/>
            <Text style={[styles.texto,{color: colorIcono2}]}>Planes    turisticos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.cambiaContenido(3)}  style={[styles.footerIcon]}>
            
            <Icon name="local-offer" size={30} color={colorIcono3} style={styles.footerIcon2} />
            <Text  ellipsizeMode ={'tail'} style={[styles.texto,{color: colorIcono3}]}>Promociones</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=> this.cambiaContenido(4)}  style={[styles.footerIcon]}>
            <Icon name="info" size={30} color={colorIcono4} style={styles.footerIcon2} />
            <Text style={[styles.texto,{color: colorIcono4}]}>Informativos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.cambiaContenido(5)}  style={[styles.footerIcon]}>
            <Icon name="pets" size={30} color={colorIcono5} style={styles.footerIcon2}/>
            <Text numberOfLines={2}  style={[styles.texto,{color: colorIcono5}]}>Espacio animalista</Text>
          </TouchableOpacity>

           <TouchableOpacity onPress={()=>this.cambiaContenido(6)}  style={[styles.footerIcon]}>
            <Icon name="help" size={30} color={colorIcono6} style={styles.footerIcon2}/>
            <Text style={[styles.texto,{color: colorIcono6}]}>Acerca</Text>
          </TouchableOpacity>
        
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    alignItems: 'center',
    
  },

slide:{
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

section1:{
elevation: 4,
backgroundColor: '#F5F6F7',
marginBottom: 1
},



lista:{
  flex: 1,
  marginTop: 5,
  width: '100%',
},

texto:{
  fontSize: 8,
  flex: 0.5,
  textAlign: 'center' 
},


footer:{
  height: 75,   
  flexDirection: 'row',
  alignItems: 'center', 
  position: 'absolute' ,
  width: '100%',
  bottom: 0,
},

footerIcon:{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 1,
},

footerIcon2:{
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  textAlignVertical: 'bottom',
  marginTop: 1,
},

actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#fff',
  },

actionButton:{
  zIndex: 10,
},

actionButtonItem:{
  backgroundColor: '#242B40',
  height: 27,
},

actionButtonItemText:{
  color: '#fff',
  fontSize: 15,
},

contBusqueda:{
  flexDirection: 'row',
  width: '100%',
  height: 90,
  position: 'absolute',
  zIndex: 15,
  borderColor: '#34C1BB',
  borderRadius: 5,
  borderWidth: 2,
  paddingTop: 20,
},

cajaBusqueda:{
flex: 1,
justifyContent: 'center',
backgroundColor: '#fff',
},

cajaLimpiar:{
  flexDirection: 'row',
},


inputBusqueda:{
width: '100%',
  paddingLeft: 4,
  paddingBottom: 4,
  color: 'gray',
  flex: 1,
  backgroundColor: '#fff'
},


inputBusqueda2:{
 width: '100%',
  paddingLeft: 4,
  color: 'gray',
  flex: 1,
  height: 45,
  fontSize: 17

},

iconBus:{
  alignItems: 'center',
  justifyContent: 'center', 
  color: '#242B40',
},

cerrar:{
flex: 1,
backgroundColor: '#242B40',
borderWidth: 1,
  height: 20,

},

txtCerrar:{
textAlign: 'center',
color: '#fff',
},

buscar:{
  width: 70,
  backgroundColor: '#34C1BB',
  alignItems: 'center',
  justifyContent: 'center',
},

cat:{
  width: '100%',
  backgroundColor: '#fff',
  paddingBottom: 10,

},

scroll:{
  height: (height*1),
},

busquedas:{
  height: 40,
  flexDirection: 'row',
  position: 'absolute',
  top: 0,
  zIndex: 50
},

overBusquedas:{
  height: 10,
    backgroundColor: '#34c1bb',

},




btnBusquedas:{
  width: '34%',
  flexDirection: 'row' ,
  justifyContent: 'center' ,
  alignItems: 'center' ,
},

btnBusquedas1:{
  backgroundColor: '#f33446',
  height: 30,
  borderTopRightRadius: 10
},

btnBusquedas2:{
  backgroundColor: '#34c1bb',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
},

btnBusquedas3:{
  backgroundColor: '#f33446',
  height: 30,
  borderTopLeftRadius: 10
},

texto2:{
  textAlign: 'center',
  color: '#fff',
  fontSize: 10
},

contenedorFiltros:{
marginVertical: 5,
paddingVertical: 5,
backgroundColor: '#fff',
  flexDirection: 'row' ,
},

labelBus:{
  backgroundColor: '#34c1bb',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: 5,
  borderRadius: 20,
},

txtLabel:{
  fontSize: 15,
  marginHorizontal: 5,
  top: 5,
},


labelIcon:{
  height: 35,
  width: 40,
  top: 5,
  textAlign: 'center',
},



menuCiudades:{
  
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'absolute',
  height: 370,
  zIndex: 50
},

fondoMenuCiudades:{
  backgroundColor: '#F33446',
  flex: 1,
  width: '100%',

},

overFondoMenuCiudades:{
  height: 40,
  width: '100%',
},

touchCiudades:{
  width: "100%",
  height: 40,
  bottom: 0,
  position: 'relative',
  alignSelf: 'center',

},

btnCiudades:{
  width: 140,
  height: 40,
  bottom: 2,
  position: 'absolute',
  resizeMode: Image.resizeMode.contain,
  alignSelf: 'center',

},

contenedorCiu:{
marginVertical: 5,
paddingVertical: 5,
backgroundColor: '#fff',
elevation: 4

},

contCiudades:{
  width: '100%',
  height: 30,
  flexDirection: 'row',
},


ciudades:{
  flex: 1,
  borderWidth: 0.5,
  height: '100%',
  borderColor: '#39425F',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: 8,
  backgroundColor: '#fff',
  flexDirection: 'row',

},

textCiudad:{
  color: '#fff',
  textAlign: 'right',
},

iconCiudades:{
  height: '100%',
  position: 'absolute',
  left: 0,
  resizeMode: Image.resizeMode.stretch,
  width: '30%'
  
},


menu:{
  position: 'absolute',
  top: 0,
  backgroundColor: '#fff',
  zIndex: 100001,
  height: '100%',
  width: 300,


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

tituloPromos:{
  fontFamily: 'CaviarDreams',
  margin: 3,
  fontSize: 10,
  color: '#000',
  margin: 5,
},

fondoMenu:{
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute' ,
  width: '100%',
  height: '100%',
  zIndex: 10000
},


fondo1:{
  width: '100%',
  height: 120,
  position: 'absolute',
  
  top: '-39%',
  left: 0,
  zIndex: 0,
  resizeMode: Image.resizeMode.center,


},


});



/*
          <TouchableOpacity onPress={()=> this.cambiaContenido(3)}  style={[styles.footerIcon]}>
            <Icon name="event-available" size={30} color={colorIcono3} style={styles.footerIcon} />
            <Text numberOfLines={1} ellipsizeMode ={'tail'} style={[styles.texto,{color: colorIcono3}]}>Eventos</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=> this.cambiaContenido(4)}  style={[styles.footerIcon]}>
            <Icon name="chrome-reader-mode" size={30} color={colorIcono4} style={styles.footerIcon} />
            <Text style={[styles.texto,{color: colorIcono4}]}>Noticias</Text>
          </TouchableOpacity>

          */