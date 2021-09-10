import React, {Component} from 'react'

import {
	Text,
	View,
	Image,
	Dimensions,
	StyleSheet,
	TouchableOpacity
} from 'react-native'

import Swiper from 'react-native-swiper'
import {Actions} from 'react-native-router-flux';



const {width}= Dimensions.get('window')



export default class extends Component{




abrirEmpresa(cod){
Actions.DetalleVenta({empresa:{codigo:cod}});
}



callBrowser = (url) =>{
    const Hurl = ('https://'+url); 

   Linking.canOpenURL(Hurl).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(Hurl);
   }
 }).catch(err => console.error('An error occurred', err));
}




	render(){
		const url='https://www.mako.guru/srcApp/imgs/slides/'+this.props.uri; 
		return(
		<TouchableOpacity style={styles2.image}  onPress={()=> {this.props.tipoLink == 1 ? this.props.appFun.cambiaCategoria(this.props.idCat,this.props.lblCat) : this.abrirEmpresa(this.props.codigo)}} >
			<Image style={styles2.image} source={{ uri : url}} />
			<View style={styles2.contxt}>
				<Text style={styles2.txt}  >{this.props.titulo}</Text>
				<Text style={styles2.txt1} >{'Buscar'}</Text>
			</View>
		</TouchableOpacity>
		)
	}
}

const styles2 = StyleSheet.create({


image:{
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
 },


contxt:{
width: '100%',
height: 65,
position: 'absolute' ,
right: 0,
bottom: 0,
overflow: 'hidden' ,
paddingHorizontal: 30,
borderTopRightRadius: 60,
borderTopLeftRadius: 60,
backgroundColor: 'rgba(246,246,246,0.6)',
alignItems: 'center',
},
 
txt:{
	color: '#111',
	width: '100%',
	flex: 1,
	textAlign: 'center',
	textAlignVertical: 'center' ,
},

txt1:{
	color: '#fff',
	width: '20%',
	height: 20,
	marginBottom: 3,
	borderRadius: 10,
	backgroundColor: 'rgba(239,72,98,0.9)',
	textAlign: 'center',
	textAlignVertical: 'center' ,
},

})