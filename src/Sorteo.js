/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions,Share,AsyncStorage} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Promo from './Promo.js';

const {width}= Dimensions.get('window')

export default class ListPromos extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      item: this.props.item,
      participando : 0,
      idUsuario: 0,

      };
 this.ImageURI = 'https://www.mako.guru/directorio/imagenes/sorteos/'+this.props.item.url;
      
  }



componentDidMount(){


  AsyncStorage.getItem('user').then((user)=>{
   

	  Image.getSize( this.ImageURI, ( Width, Height ) =>
        {
            this.setState({ 
            	ratio: (Width/Height),
            	idUsuario: user,

            });
 
        },(errorMsg) =>
        {
            console.log( errorMsg );
 
        });

this.getParticipando(user);
    
  })


} 

getParticipando(usuario){
   

    return fetch('http://www.mako.guru/listadosApp/getParticipando.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      idSorteo: this.props.item.id,
      idUsuario: usuario,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
      	alert(responseJson);
         
          if (responseJson != 0) {
           
            this.setState({
              participando: 1,
            })

          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}


  facebookShare(idPromo) {
    let mensa = 'https://mako.guru/directorio/directorio3.php?id='+this.state.codigo+'&idPromo='+idPromo;

            Share.share(
            {
                
              message: mensa
            
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));

  }






MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}


handlePress(empresa){
  if (empresa.activo != 0) {
this.contarVisita(empresa.codigo);

Actions.DetalleVenta({empresa});
}
}


participar(){

	return fetch('http://www.mako.guru/listadosApp/participando.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      idSorteo: this.props.item.id,
      idUsuario: this.state.idUsuario,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         
      	alert(responseJson);
          if (responseJson != 0) {
           
                 	this.getParticipando(this.state.user);
            

          }else{
          	alert('mm algo salio mal intenta de nuevo más tarde');
          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 


}




  render() {
        
    
  		let item =this.state.item;


            const urlpromo = 'https://www.mako.guru/directorio/imagenes/sortIcon.png';
        const imgPromo = 'https://www.mako.guru/directorio/imagenes/sorteos/'+item.url;

          return(

            <View style={[styles.promo]}  >


                  
                <View style={[styles.contPromo]}>
                  <View style={[styles.titulo]}>
                    <Image style={[styles.imgPromo,{borderColor: item.color,aspectRatio: 1.5,position: 'absolute'}]} source={require('./imgs/fondosorteo.png')}/>
                    <Text style={[styles.txttitulo]}> {item.titulo.toUpperCase()} </Text>
                  </View>

                     {item.url != '' ? 
                    <Image style={[styles.imgPromo,{borderColor: item.color,aspectRatio: this.state.ratio}]} source={{uri:imgPromo}}/>
                  :
                    null
                  }


                  <View style={[styles.txtPromo]}>
                    <Text style={styles.txtPromo}> {this.MaysPrimera(item.descripcion.toLowerCase())} </Text>
                  </View>
                  

                  {this.state.participando == 0 ?

                  <TouchableOpacity style={styles.compartir} onPress={()=> this.participar(item.id)}  > 
                  <Icon2 name="star" size={30} color={'#fff'}/>
                  <Text style={[styles.catego,{color: '#fff'}]}>   Participar</Text>
                  </TouchableOpacity>

                  :

                  <TouchableOpacity style={styles.compartir} onPress={()=> alert('Ya estás participando en este sorteo')}  > 
                  <Icon2 name="check-circle" size={30} color={'#fff'}/>
                  <Text style={[styles.catego,{color: '#fff'}]}>   Ya estás participando</Text>
                  </TouchableOpacity>
              	}


                </View>
               
                


            </View>

            );

        }
}

const styles = StyleSheet.create({

lista:{
width: '100%',
},

  promo:{
  flex: 1,
  flexDirection: 'row',
  borderTopColor: 'lightgray',
  marginTop: 15,

},

titulo:{
	width: '100%',
	height: 100

},

txttitulo:{
fontSize: 19,
},


txtPorciento:{
fontSize: 17,
alignSelf: 'center',
textAlign: 'center' ,
color: '#fff',
fontWeight: 'bold' ,
},

logo:{
  width: ((width/2)-12),
  height: ((width/2)-12),
  alignItems: 'center',
  justifyContent: 'center',
},

contPromos:{
  position: 'absolute',
  top: 0,
  right: 0,
  flexDirection: 'column',
},

contPromo:{

  backgroundColor: '#fff',
  flex: 1,
  justifyContent: 'center' ,
  alignItems: 'center' ,
  marginTop: 15,
  marginLeft: 20,
  marginRight: 10,
  borderColor: 'lightgray',
  borderWidth: 0.5,
  flexDirection: 'column',

},


txtPromo:{
fontSize: 15,
textAlign: 'left',
flex: 1,
padding: 10,
},

promoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#f54848',
marginLeft: 5,
},

infoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#79DB48',
marginLeft: 5,
},

vistoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#00A0E3',
marginLeft: 5,
},

imgPromo:{
width: 40,
height: 40,
},

image:{
    width: 40,
    height: 40,
    borderWidth: 0,

},

viewImg:{
    width: 40,
    height: 40,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: '#f54848',
    top: 0,
    left: 0,
    zIndex: 10,
    position: 'absolute',
justifyContent: 'center' ,
},


texto:{
  flex: 1,
},

txttitulo:{
  fontWeight: 'bold',
  fontSize: 13,
  textAlign: 'center',
  backgroundColor: 'lightgray',
  height: 20,
  width: '100%',
},

descripcion:{
  color: 'gray',
  fontSize: 10,
  textAlign: 'center',
},



  ver:{
    width: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },

  compartir:{
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#8078FF',
  flexDirection: 'row',
  width: "100%",
  padding: 3,
  marginHorizontal: 10
    
},

imgPromo:{

alignSelf: "stretch", 
aspectRatio: 1.5, 
resizeMode: 'stretch'
},


});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */