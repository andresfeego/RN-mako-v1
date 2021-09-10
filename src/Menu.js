import React, { Component } from 'react';
import {StyleSheet, ListView, Animated, Text, ScrollView,Image,Alert, FlatList,View, RefreshControl,AsyncStorage,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

    const imagenes = [
              {id: '0' , data: require('./imgs/avatares/sinUsuario.png') , url: './imgs/avatares/sinUsuario.png' },
              {id: '1' , data: require('./imgs/avatares/h001.png') , url: './imgs/avatares/h001.png' },
              {id: '2' , data: require('./imgs/avatares/m015.png') , url: './imgs/avatares/m015.png' },
              {id: '3' , data: require('./imgs/avatares/m002.png') , url: './imgs/avatares/m002.png' },
              {id: '4' , data: require('./imgs/avatares/h003.png') , url: './imgs/avatares/h003.png' },
              {id: '5' , data: require('./imgs/avatares/m004.png') , url: './imgs/avatares/m004.png' },
              {id: '6' , data: require('./imgs/avatares/h006.png') , url: './imgs/avatares/h006.png' },
              {id: '7' , data: require('./imgs/avatares/m005.png') , url: './imgs/avatares/m005.png' },
              {id: '8' , data: require('./imgs/avatares/h008.png') , url: './imgs/avatares/h008.png' },
              {id: '9' , data: require('./imgs/avatares/m007.png') , url: './imgs/avatares/m007.png' },
              {id: '10' , data: require('./imgs/avatares/h009.png') , url: './imgs/avatares/h009.png' },
              {id: '11' , data: require('./imgs/avatares/m010.png') , url: './imgs/avatares/m010.png' },
              {id: '12' , data: require('./imgs/avatares/h011.png') , url: './imgs/avatares/h011.png' },
              {id: '13' , data: require('./imgs/avatares/m012.png') , url: './imgs/avatares/m012.png' },
              {id: '14' , data: require('./imgs/avatares/h014.png') , url: './imgs/avatares/h014.png' },
              {id: '15' , data: require('./imgs/avatares/m013.png') , url: './imgs/avatares/m013.png' },
              {id: '16' , data: require('./imgs/avatares/h016.png') , url: './imgs/avatares/h016.png' },

            ]

export default class Menu extends Component {
  


constructor(props) {
  super(props);

  this.state = {
      leftMenu: new Animated.Value(-130),
      estadoMC:0,
      rol: 1,
      user: this.props.user,
      logoLogin:  imagenes['12'].data,
  };

}


componentWillMount(){
  this.getUsuario();
} 


getUsuario(){
    return fetch('http://www.mako.guru/listadosApp/returnUsuario.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.user
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
        if (responseJson.isAvatar == 1) {
            

          this.setState({
            logoLogin: imagenes[responseJson.imagen].data,
 
          });

        } else{
          let urlUserImage = 'https://www.mako.guru/directorio/imagenes/usuarios/'+responseJson.imagen;
          this.setState({
            logoLogin:  { uri : urlUserImage}, 
 
          });
        };
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

mensaje(titulo, mensaje){
  Alert.alert(
  titulo,
  mensaje,
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

cerrarSesion(){

   AsyncStorage.clear();

   this.setState({
      user: null,
      logoLogin:  imagenes['12'].data,

   })


}

iniciarSesion(){
  Actions.ViewLogin();

}




  render() {


    let fondo1 = require('./imgs/fondouser1.png');
    let fondo2 = require('./imgs/fondouser2.png');
    let logoLogin = this.state.logoLogin;


    return (

    	    
        <View style={styles.menu}>
            <Image source={fondo1} style={[styles.fondo1]}/>
            <Image source={fondo2} style={[styles.fondo2]} aspectRatio={1.2}/>
        
          <View style={styles.header}>
            <View style={styles.contLogoLogin}>
              <Image source={logoLogin} style={styles.logoLogin}/>
            </View>
           {this.state.user == null?
            <Text style={[styles.textoCorreo]}>Sin usuario</Text>
            :
            <Text style={[styles.textoCorreo]}>{this.state.user}</Text>
            } 
          </View>


          {this.state.user == null ?

            <TouchableOpacity  onPress={() => this.iniciarSesion()} style={[styles.btnMenu,styles.btnUsuario]}>
            <Icon name="face" size={20}  style={styles.iconoUsuario} />
            <Text style={[styles.texto]}>Iniciar Sesion</Text>
          </TouchableOpacity>
          : null

          }

          <TouchableOpacity  style={[styles.btnMenu,styles.btnUsuario]} onPress={() => this.mensaje('Estamos trabajando en esto :) !', 'Aqui podrás guardar tus empresas favotitas')} >
            <Icon name="favorite" size={20}  style={styles.iconoUsuario} />
            <Text style={[styles.texto]}>Mi comercio favorito</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => this.preguntaObsequio()} style={[styles.btnMenu,styles.btnUsuario]} onPress={() => this.mensaje('Muy Pronto!', 'Aqui podrás editar tu perfil')} >
            <Icon name="create" size={20}  style={styles.iconoUsuario} />
            <Text style={[styles.texto]}>Editar mis datos</Text>
          </TouchableOpacity>
        
          <TouchableOpacity  onPress={() => this.preguntaObsequio()} style={[styles.btnMenu,styles.btnUsuario]} onPress={() => this.mensaje('Estamos trabajando en esto :) !', 'Te obsequiamos bonos de descuento, encuentralos aquí muy pronto')} >
            <Icon name="playlist-add" size={20}  style={styles.iconoUsuario} />
            <Text style={[styles.texto]}>Mis bonos de descuento</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => this.preguntaObsequio()} style={[styles.btnMenu,styles.btnUsuario]} onPress={() => this.mensaje('Muy Pronto!', 'Sorteos exclusivos Mako :) ')} >
            <Icon name="storage" size={20}  style={styles.iconoUsuario} />
            <Text style={[styles.texto]}>Participación en sorteos</Text>
          </TouchableOpacity>

          {this.state.user != null ?

            <TouchableOpacity  onPress={() => this.cerrarSesion()} style={[styles.btnMenu,styles.btnUsuario]}>
            <Icon name="exit-to-app" size={20}  style={styles.iconoUsuario} />
            <Text style={[styles.texto]}>Cambiar usuario</Text>
          </TouchableOpacity>
          : null

          }

          </View>

 
     
    );
  }
}

const styles = StyleSheet.create({

header:{
  textAlign: 'center' ,
  height: 120,
  marginBottom: 20,
  padding: 10,
  marginTop: 32
},

fondo2:{
  width: '90%',
  position: 'absolute',
    bottom: '-190.5%',
  left: '0%',
  resizeMode: Image.resizeMode.center,

},

fondo1:{
  width: '100%',
  position: 'absolute',
  aspectRatio: 0.6,
  top: '-46%',
  left: 0,
  zIndex: 0,
  resizeMode: Image.resizeMode.center,

},

textoCorreo:{
  textAlign: 'center' ,
},

texto:{
  marginHorizontal: 5,
},


btnMenu:{
  
  backgroundColor: '#fff',
  height: 30,
  padding: 5,
  zIndex: 20,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'row' 
},


btnUsuario:{ 
  borderBottomColor: '#f33446', 
  borderBottomWidth: 0.5
},


iconoUsuario:{ 
  color: '#f33446',
  alignSelf: 'flex-start' ,
},

logoLogin:{
 width: '100%',
    height: '100%',
  alignSelf: 'center',
  resizeMode: Image.resizeMode.contain,


},

contLogoLogin:{
 width: 80,
    height: 80,
  alignSelf: 'center',
  borderRadius: 50,
  backgroundColor: '#fff',
  overflow: 'hidden' ,
  borderColor: 'gray',
  borderWidth: 2
},

menu:{
  justifyContent: 'flex-start' ,
},

});


