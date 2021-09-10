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
  TextInput,
  Keyboard,
  NetInfo,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';



export default class Inicio extends Component<{}> {


//............................DID AND WILL MOUNT METHOD .............................





//............................FUNCIONES PARA generar carta presentacion  .............................



componentDidMount(){
  //AsyncStorage.clear();
  //AsyncStorage.setItem('user', 'andres.feego@gmail.com')
  //AsyncStorage.setItem('pass', '123')
var con = false;
NetInfo.isConnected.fetch().then(isConnected => {
  con = isConnected;

if (con) {

  AsyncStorage.getItem('user').then((user)=>{
    AsyncStorage.getItem('pass').then((pass)=>{
    
    if (user != null && pass != null) {
              this.login(user,pass);
    } else{
             Actions.ViewLogin();
            
    };
    
    })  
  })

} else{
   Actions.DirectorioOffline();
};
});

}



login(user, pass){

    if (user != '' && pass != '') {
    return fetch('http://www.mako.guru/listadosApp/loginUsuarios.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      user: user,
      pass: pass
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       if (responseJson == 1) {
          this.faltaUser()
       } else{
          
          if (responseJson == 2) {
            this.faltaPass();
          } else{
              if (responseJson == 0) {
              Keyboard.dismiss();
              Actions.CambioPass({idComercio: responseJson,user: user, pass: pass});

              } else{
                Keyboard.dismiss();
              Actions.Home({user:user, pass: pass});

              };
          };
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 

  Keyboard.dismiss();

  } else{
    this.faltanDatos();
  };

}
//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    
      return (
       

      <View style={styles.container}> 
		

      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  height: '100%',
},

fondo:{
    width: '100%',
    height: '120%',
  position: 'absolute',
  top:-80,
  left: 0,
  resizeMode: Image.resizeMode.contain,
},


formulario:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
},

header:{
  backgroundColor: '#242B40',
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
},

footer:{
  backgroundColor: 'rgb(52, 193, 187)',
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
},

txtheader:{
	textAlign: 'center',
	alignItems: 'center', 
	fontSize: 17,
	color: '#fff'
},

txtfooter:{
	textAlign: 'center',
	alignItems: 'center', 
	fontSize: 17,
	color: '#fff',
	marginRight: 15
},

txtFormu:{
	width: '80%',
  paddingLeft: 4,
  paddingBottom: 4,
  color: '#2e3638',
  backgroundColor: '#fff',
  marginBottom: 4,
  borderRadius: 4,

},

contfooter:{
	flexDirection: 'row',
	alignItems: 'center',
  overflow: 'hidden' 
},


});


/*


        

        <FlatList
          data={this.state.correos}
          renderItem={({item}) => <Text style={styles.txt3}>{item.correo}</Text>}
          keyExtractor={item => item.idcorreo}/>

        <FlatList
          data={this.state.horarios}
          renderItem={({item}) => <Text style={styles.txt3}>{item.de}</Text>}
          keyExtractor={item => item.idjornadas}/>

*/