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
  AsyncStorage,
} from 'react-native';

import Moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import resolveAssetSource from 'resolveAssetSource';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');



export default class ViewLogin extends Component<{}> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user:'',
	  	pass:'',
	  	estado: 0,
	  	correo: '',
	  	nombres: '',
	  	apellidos: '',
	  	genero: 0,
	  	pass1: '',
	  	pass2: '',
      ratio: 0.6,
	    isDateTimePickerVisible: false,
        fechaNacimiento: Moment(new Date()).format('YYYY-MM-DD'),
        radio_props : [
                      {label: 'Mujer', value: 0 },
                      {label: 'Hombre', value: 1 }
                    ],
	  };

     this.ImageURI = './imgs/fondoViewLogin.jpg';

	}

//............................DID AND WILL MOUNT METHOD .............................

componentDidMount(){

  let fond =  require('./imgs/fondoViewLogin.jpg');
  let source = resolveAssetSource(fond);

  this.setState({
    ratio : (source.height/source.width),
  })
       
} 



//............................FUNCIONES PARA generar carta presentacion  .............................


verificardatos(){

	let errores = 0;

	    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if (reg.test(this.state.correo) === false){
               this.mensaje('Introduce un correo electrónico válido');
               errores = errores + 1;
           };

           if (this.state.nombres == '') {
               this.mensaje('Introduce tu nombre');
               errores = errores + 1;
           };

           if (this.state.apellidos == '') {
               this.mensaje('Introduce tu apellido');
               errores = errores + 1;
           };

           if (this.state.pass1 == '') {
               this.mensaje('Introduce tu contraseña');
               errores = errores + 1;
           };

           if (this.state.pass2 == '') {
               this.mensaje('Repite tu contraseña');
               errores = errores + 1;
           };

           if (this.state.pass1 != this.state.pass2) {
               this.mensaje('Las contraseñas no coinciden');
               errores = errores + 1;
           };

           if (errores == 0) {
           	this.registrar();
           };

}


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




registrar(){

    return fetch('http://www.mako.guru/listadosApp/registrarUsuario.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      correo: this.state.correo,
      nombres: this.state.nombres,
      apellidos: this.state.apellidos,
      genero: this.state.genero,
      fechaNacimiento: this.state.fechaNacimiento,
      pass1: this.state.pass1
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
        if (responseJson == 2) {

          alert('Este correo electronico ya esta registrado');

        } else{

       if (responseJson == 0) {
          this.errorRegistro()
       } else{
          
              Actions.subeImagenUsuario({user: this.state.correo, pass: this.state.pass1});

       };

        };
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 

	Keyboard.dismiss();

 }


errorRegistro(){
  Alert.alert(
  'Algo salio mal !',
  'La magia salio algo mal o estamos haciendo mantenimiento al sistema, intenta de nuevo más tarde',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}


faltanDatos(){
  Alert.alert(
  'Faltan datos !',
  'Debes ingresar el usuario y contraseña suministrados por un administrador de www.mako.guru ',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}

faltaUser(){
  Alert.alert(
  'Algo salio mal !',
  'Usuario invalido o desactivado',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

faltaPass(){
  Alert.alert(
  'Algo salio mal !',
  'Contraseña errónea ponte en contacto con un administrador Mako',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}


 showDateTimePicker(){

 this.setState({ isDateTimePickerVisible: true });
 } 
 
 hideDateTimePicker(){

  this.setState({ isDateTimePickerVisible: false });
}

 handleDatePicked(date){
  this.setState({ fechaNacimiento: Moment(date).format('YYYY-MM-DD') });
    this.hideDateTimePicker();
  };

//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {


    let fondo = require('./imgs/fondoViewLogin.jpg');
    let logoLogin = require('./imgs/logomako1.png');
      return (
       


      <View style={styles.container}> 

                   <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={(date)=> this.handleDatePicked(date)}
          onCancel={()=> this.hideDateTimePicker()}/>

    
      <Image source={fondo} style={[styles.fondo,{aspectRatio: this.state.ratio}]}/>

      <View style={styles.contLogin}>

        <View style={styles.viewLogoLogin}>
	        <Image source={logoLogin} style={styles.logoLogin}/>
        </View>

        {this.state.estado == 0 ?
        	<View style={styles.formulario}>
        
        <TouchableOpacity  style={styles.btnLogin} onPress={() => {this.setState({estado: 1})}} >
          <Text style={styles.txtbtnLogin}>Iniciar sesión</Text>
        </TouchableOpacity>
		
		<TouchableOpacity  style={styles.btnLogin} onPress={() => {this.setState({estado: 2})}} >
          <Text style={styles.txtbtnLogin}>Registrarse</Text>
        </TouchableOpacity>
		
		<TouchableOpacity  style={styles.btnLogin} onPress={() => {Actions.Home();Keyboard.dismiss()}} >
          <Text style={styles.txtbtnLogin}>Saltar</Text>
        </TouchableOpacity>

        </View>
        : null
        }



        {this.state.estado == 1 ?
        	<View style={styles.formulario}>

        <TextInput placeholder="Correo" placeholderTextColor="gray"  onChangeText={user => this.setState({user})} style={styles.txtFormu}/>
        <TextInput placeholder="Contraseña" placeholderTextColor="gray" secureTextEntry={true} onChangeText={pass => this.setState({pass})} style={styles.txtFormu}/>
        

        <TouchableOpacity  style={styles.btnLogin} onPress={() => this.login()} >
          <Text style={styles.txtbtnLogin}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.btnLogin} onPress={() => {this.setState({estado: 0})}} >
          <Text style={styles.txtbtnLogin}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {Actions.RecupPass();Keyboard.dismiss()}} >
          <Text style={styles.txtrecup}>Recuperar contraseña</Text>
        </TouchableOpacity>

        </View>
        : null
        }


         {this.state.estado == 2 ?
        <View style={styles.formulario}>

        <ScrollView style={styles.formulario2}>

        <TextInput placeholder="Correo" placeholderTextColor="gray"  onChangeText={correo => this.setState({correo})} style={styles.txtFormu}/>
        <TextInput placeholder="Nombres" placeholderTextColor="gray"  onChangeText={nombres => this.setState({nombres})} style={styles.txtFormu}/>
        <TextInput placeholder="Apellidos" placeholderTextColor="gray"  onChangeText={apellidos => this.setState({apellidos})} style={styles.txtFormu}/>
        <TextInput placeholder="Contraseña" placeholderTextColor="gray" secureTextEntry={true} onChangeText={pass1 => this.setState({pass1})} style={styles.txtFormu}/>
        <TextInput placeholder="Repetir contraseña" placeholderTextColor="gray" secureTextEntry={true} onChangeText={pass2 => this.setState({pass2})} style={styles.txtFormu}/>
        
        
        <View style={styles.fechaformu}>
        <TextInput   style={styles.txtFormuFecha} TextColor="gray"> {'Fecha de nacimiento: '+this.state.fechaNacimiento} </TextInput>

        <TouchableOpacity style={[styles.btnFecha]} onPress={()=> this.showDateTimePicker()}>
            <Icon name="date-range" size={30} color={'#fff'} />
        </TouchableOpacity>
        </View>


		<View>
			<Text style={styles.txtId}>Genero</Text>

			<RadioForm
			radio_props={this.state.radio_props}
			initial={0}
			style={[styles.radioBtn,styles.txtId]}
			buttonColor={this.state.colorCiudad}
			formHorizontal={true}
			onPress={(value) => {this.setState({genero:value})}}/>
		</View>

        <TouchableOpacity  style={styles.btnLogin2} onPress={() => this.verificardatos()} >
          <Text style={styles.txtbtnLogin}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.btnLogin2} onPress={() => {this.setState({estado: 0})}} >
          <Text style={styles.txtbtnLogin}>Atrás</Text>
        </TouchableOpacity>

 
        </ScrollView>
        </View>
        : null
        }
        
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

fondo:{
alignSelf: "stretch", 
resizeMode: 'stretch',
width: '100%',
height: '100%',
position: 'absolute' ,
  resizeMode: Image.resizeMode.cover,
},

logoLogin:{
 width: '60%',
    height: '60%',
  alignSelf: 'center',
  resizeMode: Image.resizeMode.contain,
  elevation: 4
},

contLogin:{
flex: 1,
justifyContent: 'flex-start',

},

formulario:{
	alignItems: 'center',
  flex: 1,
  


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
elevation: 4
},

btnLogin:{
	backgroundColor: '#34C1BB',
	padding: 3,
	borderRadius: 20,
	width: '50%',
	elevation: 3,
	margin: 5
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