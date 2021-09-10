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
  Dimensions,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');


export default class CambioPass extends Component<{}> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	id: this.props.user,
      	pass:this.props.pass,
	  	pass1:'',
	  	pass2:'',
	  };

	}

//............................DID AND WILL MOUNT METHOD .............................





//............................FUNCIONES PARA generar carta presentacion  .............................




login(){

    if (this.state.pass1 != '' && this.state.pass2 != '' ) {
   		
   		if ( this.state.pass1 != this.state.pass) {
   			if (this.state.pass1 == this.state.pass2) {
   			 return fetch('http://www.mako.guru/listadosApp/cambiarPassUsu.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      pass1: this.state.pass1+'',
      id: this.state.id
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       
       if (responseJson == 0) {
          	this.CambioMal();
       } else{
          
        Keyboard.dismiss();
          this.cambioOk()
      
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 

	Keyboard.dismiss();
   		} else{
    		this.passDiferentes();
   		};
   		} else{
	   		this.passAntigua();

   		};

  } else{
    this.faltanDatos();
  };

}

faltanDatos(){
  Alert.alert(
  'Faltan datos !',
  'Debes ingresar la nueva contraseña en los dos campos',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}

passDiferentes(){
  Alert.alert(
  'Algo salio mal !',
  'Debes ingresar la misma contraseña en los dos campos',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

passAntigua(){
  Alert.alert(
  'Algo salio mal !',
  'Debes ingresar una contraseña diferente a la actual en el sistema',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

cambioOk(){

  Alert.alert(
  'Todo bien !',
  'Se ha actualizado de forma correcta tu contraseña',
  [
    {text: 'Ok', onPress: () =>  Actions.Home({user: this.state.id, pass: this.state.pass1})}
  ],
  { cancelable: false }
)
}

cambioMal(){
  Alert.alert(
  'Algo salio mal !',
  'No ha sido posible actualizar tu contraseña intenta de nuevo mas tarde',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}


//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    
      return (
       

      <View style={styles.container}> 
		
	    <Image source={require('./imgs/fondoViewLogin.jpg')} style={[styles.fondo,{height: height}]}/>

        <View style={styles.viewLogoLogin}>
		    <Text style={styles.txtCambio}>Ingresaste con un código de recuperación, debes cambiar la contraseña para ingresar al sistema.</Text>
    	</View>

        <View style={styles.formulario}>
        <TextInput placeholder="Nueva contraseña" placeholderTextColor="gray" secureTextEntry={true}  onChangeText={pass1 => this.setState({pass1})} style={styles.txtFormu}/>
        <TextInput placeholder="Repetir Nueva contraseña" placeholderTextColor="gray" secureTextEntry={true} onChangeText={pass2 => this.setState({pass2})} style={styles.txtFormu}/>


        <TouchableOpacity  style={styles.btnLogin} onPress={() => this.login()}  >
          <Text style={styles.txtbtnLogin}>Cambiar contraseña</Text>
        </TouchableOpacity>

        </View>

      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  height: '100%',
  justifyContent: 'center' ,
},

fondo:{
alignSelf: "stretch", 
resizeMode: 'stretch',
width: '100%',
height: '100%',
position: 'absolute' ,
  resizeMode: Image.resizeMode.cover,
},


formulario:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'flex-start',
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

txtCambio:{
  textAlign: 'center',
  alignItems: 'center', 
  fontSize: 22,
  color: '#fff',
  alignSelf: 'center',
  fontFamily: 'CaviarDreams',
  marginBottom: 15,
  backgroundColor: 'rgba(34,34,34,0.65)',
  paddingVertical: 10
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
},

viewLogoLogin:{
flex: 1,
justifyContent: 'center' ,
},

btnLogin:{
	backgroundColor: '#34C1BB',
	padding: 5,
	borderRadius: 20,
	width: '50%',
	elevation: 4,
	margin: 5
},

txtbtnLogin:{
	textAlign: 'center',
	fontSize: 18,
	color: '#fff',
	fontFamily: 'CaviarDreams'

}


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