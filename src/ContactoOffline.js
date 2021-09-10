import React, { PureComponent } from 'react';
import { View, Text, NetInfo, TouchableOpacity,Dimensions, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'comerci.db' , createFromLocation: '~comercio.db'})


class ContactoOffline extends PureComponent {
  state = {
  	detalles: false,
  };


componentWillMount(){
}



MaysPrimera(string){
	string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}


abrirDetalles(){
	this.setState({
		detalles: !this.state.detalles,
	})
}




callNumber = (url) =>{
   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}


whatsapp = (phone,wp) =>{
  if (wp != 0) {
  const url = 'whatsapp://send?text=Buen día, te contacto por  medio de www.mako.guru, quisiera...&phone=+57'+phone; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
   };
}





  render() {

  	var contacto = this.props.item;
  	var colorWhat = '#26CC64';
  	if (contacto.whatp == '0') {
  		colorWhat = 'gray';
  	};

  	let llamada = `tel:${contacto.telefonop}`;

  return (
    <View style={styles.offlineContacto}>
            

    	<TouchableOpacity style={[styles.contactoSimple,{borderColor: contacto.color}]} onPress={() => this.abrirDetalles()}>

			
			<Icon name="account-circle" size={30} color={contacto.color} style={styles.iconoNombre}/>
			
			<Text style={styles.offlineText2}>{this.MaysPrimera(contacto.nombre)}</Text>

	    	<View style={styles.btnDetalle}>

	      	</View>
			
      	</TouchableOpacity>

      	{this.state.detalles == true ?
      	
      	<View style={styles.detalleContacto}>
	      
	    	<View style={styles.detalleTexto}>
		    		
	    		<View style={styles.detalleTexto2}>
					<Icon name="store" size={20} color={'white'} style={[styles.iconoDetalle,{backgroundColor: contacto.color}]}/>
					<Text style={styles.offlineText3}>{this.MaysPrimera(contacto.descripcion)}</Text>
	       		</View>

	    		<View style={styles.detalleTexto2}>
					<Icon2 name="md-globe" size={20} color={'white'} style={[styles.iconoDetalle,{backgroundColor: contacto.color}]}/>
					<Text style={[styles.offlineText3,{color: contacto.color}]}>{this.MaysPrimera(contacto.ciudad)}</Text>
	       		</View>

	    		<View style={styles.detalleTexto2}>
					
					<Icon name="place" size={20} color={'white'} style={[styles.iconoDetalle,{backgroundColor: contacto.color}]}/>
					<Text style={styles.offlineText3}>{this.MaysPrimera(contacto.direccion)}</Text>
	       		</View>

	       	</View>
	      
	    	<View style={styles.detalleBotones}>

				<TouchableOpacity style={[styles.btnAccion,{backgroundColor: '#354bd0'}]} onPress={()=> this.callNumber(llamada)}>
					<Icon name="phone" size={20} color={'white'} style={[styles.iconoLlamada]}/>
					<Text style={styles.offlineText4}>{contacto.telefonop}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.btnAccion,{backgroundColor: colorWhat}]} onPress={()=> this.whatsapp(contacto.telefonop,contacto.whatp)}>
					<Icon2 name="logo-whatsapp" size={20} color={'white'} style={styles.iconoLlamada}/>
					<Text style={styles.offlineText4}>{contacto.telefonop}</Text>
				</TouchableOpacity>

	       	</View>

	    </View>

      		:
      		null 
      	}
    	
    </View>
  );


   
}
}

const styles = StyleSheet.create({
  offlineContacto: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width,
    position: 'relative',
  },

  contactoSimple:{
  	flexDirection: 'row',
  	height: 35,
  //	borderWidth: 0.2
  },
  
  offlineText: { 
  	color: '#fff' 
  },

  iconoNombre:{
  	height: 30,
  	width: 30,
  	borderRadius: 20,
  	textAlign: 'center',
  	alignSelf: 'center' ,
  	margin: 10,

  },



    offlineText2: { 
  	color: '#343434' ,
  	fontSize: 16,
  	flex: 1,
  	paddingVertical: 5
  },

  barraCarga:{
  	backgroundColor: '#34c1bb',
  	height: 5,
  	borderRadius: 5,
  },

  btnDetalle2:{
  	backgroundColor: '#fff',
  	width: 40,
  	height: '100%',
  	borderLeftWidth: 0.2,
  	borderColor: '#343434'

  },

  detalleContacto:{
  	height: 175,
  	backgroundColor: '#fff',
  	width: '100%',
  	paddingVertical: 10,
  	elevation: 4
  },

  iconoDetalle:{
  	height: 23,
  	width: 23,
  	borderRadius: 20,
  	textAlign: 'center',
  	alignSelf: 'center' ,
  	marginHorizontal: 10,
  	marginLeft: 40,
  	backgroundColor: '#fff',
  	justifyContent: 'center',
  	alignItems: 'center',
  	paddingTop: 2,

  },

  offlineText3:{
  	fontSize: 15,
  	textAlign: 'left' ,
  	margin: 5,
  	flex: 1

  },

  detalleTexto2:{
  	flexDirection: 'row' 
  },

detalleBotones:{
	height: 30,
	width: '90%',
	flexDirection: 'row',
	marginLeft: 35
},

  btnAccion:{
  	flex: 1,
  	height: 30,
  	margin: 5,
  	borderRadius: 20,
  	flexDirection: 'row' ,
  	elevation: 4

  },

  iconoLlamada:{
    	height: 20,
  	width: 20,
  	borderRadius: 20,
  	textAlign: 'center',
  	alignSelf: 'center' ,
  	marginHorizontal: 10,
  },

    offlineText4:{
  	fontSize: 15,
  	textAlign: 'left' ,
  	margin: 5,
  	color: '#fff'

  },



});

export default ContactoOffline;