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
  Dimensions,
  Keyboard,
  RefreshControl,
  AsyncStorage,
} from 'react-native';

import Moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');



export default class subeImagenUsuario extends Component<{}> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user:this.props.user,
	  	pass:this.props.pass,
	  	logoLogin: require('./imgs/avatares/sinUsuario.png'),
      logoLoginSource: './imgs/avatares/sinUsuario.png',
      isAvatar: 1,

	  };
	}

//............................DID AND WILL MOUNT METHOD .............................





//............................FUNCIONES PARA generar carta presentacion  .............................





mensaje(mensaje){
  Alert.alert(
  'Algo salio mal !',
  mensaje,
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}



login(){

    if (this.state.user != '' && this.state.pass != '') {
    return fetch('http://www.mako.guru/listadosApp/loginUsuarios.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      user: this.state.user,
      pass: this.state.pass
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
              Actions.CambioPass({idComercio: responseJson,user: this.state.user, pass: this.state.pass});

              } else{
                Keyboard.dismiss();
              Actions.Home({user: this.state.user, pass: this.state.pass});

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

cambiaAvatar(data, url){


this.setState({
  logoLogin: data,
  logoLoginSource: url,
  isAvatar: 1,
})

 

}


agregarImagen(){
  ImagePicker.openPicker({
  width: 500,
  height: 500,
  cropping: true
}).then(image => {
alert('okokok');
  this.setState({
    logoLoginSource: image.path,
    isAvatar: 0,
  })

       

});
}




uploadImage(nombre,eliminar){

  if (this.state.isAvatar != 1) {


   RNFetchBlob.fetch('POST', 'https://www.mako.guru/listadosApp/uploadImgUsuario.php', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    Accept: 'text/plain',
    'Content-Type' : 'multipart/form-data',
  }, [

    { name : 'imagen', filename : nombre, type:'image/png', data: RNFetchBlob.wrap(this.state.logoLoginSource)},
    { name : 'id', filename : this.state.user, type:'image/png', data: 'null'},
    { name : 'eliminar', filename : eliminar, type:'image/png', data: 'null'},
 
     

     
  ]).then((response) => response.json())
      .then((responseJson) =>{
        

            if (responseJson != 0) {
              if (responseJson == '1') {

                
                  this.guardaUrl(responseJson, this.state.isAvatar);        

              } else{

                
                  this.guardaUrl(responseJson, this.state.isAvatar);        

              };
            } else{
    
    this.props.fn.setState({
      label: 'Imposible guardar la imagen en este momento',
    })

            };
      }).catch((err) => {
    this.props.fn.setState({
      label: 'Imposible guardar la imagen en este momento',

    })
  })

      } else{

          this.guardaUrl(this.state.logoLoginSource, this.state.isAvatar);        
      };
   
}




guardaUrl(nombre,avatar){


    return fetch('http://www.mako.guru/listadosApp/guardaUrlUsuario.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.user,
      url: nombre,
      isAvatar: this.state.isAvatar,
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{

        Actions.Home({user: this.state.user, pass: this.state.pass});
    
      })

.catch((error) => {
        alert('error fetch: '+error);
      }); 


}



//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    let fondo = require('./imgs/fondoViewLogin.jpg');
    

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
      return (
       


      <View style={styles.container}> 

                      
      <Image source={fondo} style={[styles.fondo,{height: height}]}/>

      <View style={styles.contLogin}>

        <View style={styles.viewLogoLogin}>
	        
	        <Image source={this.state.logoLogin} style={styles.logoLogin}/>

	        <TouchableOpacity  style={styles.btnLogin} onPress={() => {this.agregarImagen()}} >
	          <Text style={styles.txtbtnLogin}>Buscar imagen</Text>
	        </TouchableOpacity>

	        <TouchableOpacity  style={styles.btnLogin} onPress={() => {this.uploadImage('imagen.png','0')}} >
	          <Text style={styles.txtbtnLogin}>Guardar</Text>
	        </TouchableOpacity>

        </View>

      


        <ScrollView style={styles.formulario}>

       		<Text style={styles.txtbtnLogin}>O puedes escoger una de estas</Text>
       		
       		<FlatList
    			numColumns={4}
    			style={styles.lista}
        		data={imagenes}
        		renderItem={({item}) => {
 			        return(

		        		<TouchableOpacity  style={styles.btnAvatar} onPress={() => this.cambiaAvatar(item.data, item.id)} >
		        			<View style={styles.fondoAvatar}>
					        	<Image source={item.data} style={styles.logoAvatar}/>
					        </View>
				        </TouchableOpacity>
            		);

        		}
        	}
        	keyExtractor={item => item.id}/>
     
        </ScrollView>
 
    
        
      </View>



      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  width: '100%',
  height: '100%',
  justifyContent: 'center',

},

lista:{
	marginTop: 10,
},


fondo:{
alignSelf: "stretch", 
resizeMode: 'stretch',
width: '100%',
height: '100%',
position: 'absolute' ,
  resizeMode: Image.resizeMode.cover,
},

logoLogin:{
 width: '50%',
    height: '50%',
  alignSelf: 'center',
  resizeMode: Image.resizeMode.contain,
},

logoAvatar:{
 width: '100%',
    height: '100%',
  alignSelf: 'center',
  resizeMode: Image.resizeMode.contain,
},

fondoAvatar:{
	backgroundColor: '#fff',
	borderRadius: 50,
},

contLogin:{
flex: 1,
justifyContent: 'flex-start',

},

formulario:{
  flex: 1,
  marginTop: 2,
  paddingHorizontal: 15,
  flexDirection: 'column' ,
  flexWrap: 'nowrap' 


},

formulario2:{
  flex: 1,
  marginTop: 2,
  width: '100%',
  marginLeft: '20%'


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

txtLogo:{

	textAlign: 'center',
	alignItems: 'center', 
	fontSize: 28,
	color: '#2e3638',
	marginRight: 15,
	alignSelf: 'center',
  fontFamily: 'CaviarDreams',
},


txtrecup:{
textAlign: 'center',
  alignItems: 'center', 
  fontSize: 18,
  color: '#fff',
  marginRight: 15,
  alignSelf: 'center',
  fontFamily: 'CaviarDreams_Bold',
  textDecorationLine: 'underline' ,
},

txtFormu:{
  width: '80%',
  paddingLeft: 4,
  paddingBottom: 4,
  color: '#2e3638',
  backgroundColor: '#ffffffce',
  marginBottom: 9,
  borderRadius: 4,
  elevation: 5,
  textAlign: 'center',

},

contfooter:{
	flexDirection: 'row',
	alignItems: 'center',
},

viewLogoLogin:{
flex: 1,
justifyContent: 'center' ,
alignItems: 'center',
},

btnLogin:{
	backgroundColor: '#34C1BB',
	padding: 5,
	borderRadius: 20,
	width: '50%',
	elevation: 4,
	margin: 5
},

btnAvatar:{
	backgroundColor: '#34C1BB',
	padding: 2,
	borderRadius: 50,
	width: 80,
	height: 80,
	elevation: 4,
	margin: 5,
	overflow: 'hidden' ,
},


btnLogin2:{
	backgroundColor: '#34C1BB',
	padding: 5,
	borderRadius: 20,
	width: '80%',
	elevation: 4,
	margin: 5
},


txtbtnLogin:{
	textAlign: 'center',
	fontSize: 18,
	color: '#fff',
	fontFamily: 'CaviarDreams'

},

fechaformu:{
	flexDirection: 'row' ,
	width: '80%'
},

txtFormuFecha:{
	  flex: 1,
  paddingLeft: 4,
  paddingBottom: 4,
  color: '#2e3638',
  backgroundColor: '#ffffffce',
  marginBottom: 9,
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  elevation: 5,
  textAlign: 'center',
},

btnFecha:{
	width: 40,
  marginBottom: 9,
	backgroundColor: '#34C1BB',
	justifyContent: 'center' ,
	alignItems: 'center',
},

txtId:{
	color: '#fff'
},

radioBtn:{
	backgroundColor: 'rgba(220,220,220,0.7)',
	width: '80%',
	padding: 4,
	borderRadius: 4,

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