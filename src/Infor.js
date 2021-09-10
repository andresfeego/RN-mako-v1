/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions,Share} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon2 from 'react-native-vector-icons/Ionicons';

const {width}= Dimensions.get('window')

export default class Infor extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      item: this.props.item,
      ratio: 1
      
      };

    this.ImageURI = 'https://www.mako.guru/directorio/imagenes/informativos/'+this.props.codigo+'/'+this.props.item.imagen;

  }



componentDidMount(){
  Image.getSize( this.ImageURI, ( Width, Height ) =>
        {
            this.setState({ ratio: (Width/Height)});
 
        },(errorMsg) =>
        {
            console.log( errorMsg );
 
        });
       
} 

  
  facebookShare(idInfo) {
    let mensa = 'https://mako.guru/directorio/directorio3.php?id='+this.props.codigo+'&idInfor='+idInfo;

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





  render() {
 		const item = this.state.item;
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/infoIcon.png';
        const imgPromo = 'https://www.mako.guru/directorio/imagenes/informativos/'+item.codigo+'/'+item.imagen;

          return(

              <View style={[styles.promo]}  >


                  <View style={[styles.viewImg]}>
                    <Image style={[styles.image]} source={{ uri : urlpromo}}/>
                  </View>
                  
                <View style={[styles.contPromo]}>
                  <View style={[styles.titulo]}>
                    <Text style={[styles.txttitulo]}> {item.titulo.toUpperCase()} </Text>
                  </View>

                   {item.imagen != null ? 
                    <Image style={[styles.imgPromo,{borderColor: item.color,aspectRatio: this.state.ratio}]} source={{uri:imgPromo}}/>
                  :
                    null
                  }

                  
                  <View style={[styles.txtPromo]}>
                    <Text style={styles.txtPromo}> {this.MaysPrimera(item.descripcion.toLowerCase())} </Text>
                  </View>

                  <TouchableOpacity style={styles.compartir} onPress={()=> this.facebookShare(item.id)}  > 
                  <Icon2 name="md-share" size={30} color={'#fff'}/>
                  <Text style={[styles.catego,{color: '#fff'}]}> Compartir</Text>
                  </TouchableOpacity>
                  
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
  flexDirection: 'column',

},

titulo:{
	width: '100%',

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
  flex: 1,
  backgroundColor: 'red',
  top: 0,
  right: 0,
  flexDirection: 'row',
},

contPromo:{

  backgroundColor: '#fff',
  flex: 1,
  justifyContent: 'center' ,
  alignItems: 'center' ,
  marginTop: 25,
  marginLeft: 20,
  marginRight: 10,
  borderColor: 'lightgray',
  borderWidth: 0.5,
  flexDirection: 'column',
  elevation: 5,

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

alignSelf: "stretch", 
aspectRatio: 1.5, 
resizeMode: 'stretch'
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
    backgroundColor: '#79DB48',
    top: 10,
    left: 0,
    elevation: 9,
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
  backgroundColor: '#4177F6',
  flexDirection: 'row',
  width: "100%",
  padding: 3,
  marginHorizontal: 10
    
},


});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */