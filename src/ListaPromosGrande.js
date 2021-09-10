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
  AsyncStorage,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import DetalleVenta from './DetalleVenta.js';

export default class ListaPromosGrande extends Component<{}> {


//.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);
     this.state = {
        ciudad: this.props.ciudad,
      busRazon: this.props.busRazon,
      busServicios: this.props.busServicios,
      busCategoria: this.props.busCategoria,

      refreshing: false,
      dsPromosEmp: [],



      };

  }


//............................DID AND WILL MOUNT METHOD .............................

componentDidMount(){


  this.getPromosEmp(0,this.props.ciudad,this.props.busRazon,this.props.busServicios,this.props.cat);
 this.actualizar();
}

 componentWillReceiveProps(nextProps: Props) {
  this.setState({
    ciudad: nextProps.ciudad,
        busRazon: nextProps.busRazon,
        busServicios: nextProps.busServicios,
        busCategoria: nextProps.busCategoria,
          })
 
    this.getPromosEmp(0,nextProps.ciudad, nextProps.busRazon, nextProps.busServicios ,nextProps.busCategoria);

  }



  
actualizar(){


     this.getPromosEmp(0,this.state.ciudad, this.state.busRazon, this.state.busServicios , this.state.busCategoria).then(() =>{
  
  let that = this;

  setTimeout(function() {
        that.actualizar();
        }, 5000);
  })

}

//............................FUNCIONES PARA ARMADO DE EMPRESA COMPLETA .............................





getPromosEmp(id,ciudad, razon, servicio, categoria){

    return fetch('http://www.mako.guru/listadosApp/returnPromosGeneral.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: id,
      ciudad: ciudad,
      busRazon: razon,
      busServicios: servicio,
      busCategoria: categoria,
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         // console.warn('promosemp', responseJson);
            
          if (responseJson != 0) {
            data=[];
            data= responseJson;
            this.setState({
              dsPromosEmp: data,
            })


          }else{
             this.setState({
              dsPromosEmp: [],

            })

          }

        
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}



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




_onRefesh(){
  
  this.setState({
    refreshing: true,
  });
     this.getCat().then(() =>{
    this.setState({
      refreshing:false,
    })
  })

  
 
}

generarPromos(){

}


//............................FUNCIONES PARA RENDER .............................
  render() {
   


    return (
       


             <View>
               {this.state.dsPromosEmp.length > 0?

 <View style={styles.listaPromoEmp} >
               <Text style={styles.tituloDirectorio}> PROMOCIONES </Text>

    <FlatList
    style={styles.lista}
        data={this.state.dsPromosEmp}
        renderItem={({item}) => {


      
        const logoPromoEmp = 'https://www.mako.guru/directorio/'+item.url_logo;
        const imgPromo = 'https://www.mako.guru/directorio/imagenes/promos/'+item.codigo+'/'+item.imagen;
          return(

              <TouchableOpacity style={styles.promoEmp} onPress={()=> {item.tipoLink == 1? this.callBrowser(item.link): this.abrirEmpresa(item.codigo)}}>
           

                  {item.imagen != null ? 
                    <Image style={[styles.logoPromoEmp,{borderColor: item.color}]} source={{uri:imgPromo}}/>
                  :
                    <Image style={[styles.logoPromoEmp,{borderColor: item.color}]} source={{uri:logoPromoEmp}}/>
                  }
               
                <View style={[styles.txtPromoEmp]}>
                  <Text style={[styles.tituloPromoEmp]}> {item.titulo.toUpperCase()} </Text>
                                    
                  <View style={styles.txtDescPromoEmp}>
                    <Text style={styles.descripcionPromoEmp}> {item.descripcion} </Text>
                    
                      {item.porciento > 0 ?
                        <View style={styles.porcientoPromoEmp}>
                          <Image style={[styles.imgPromo]} source={require('./imgs/iconoPromo2.png')}/>
                          <Text style={styles.porcientoEmp}> {item.porciento+'%'} </Text>
                        </View>
                      : null
                      }

                  </View>

                </View>

              </TouchableOpacity>

            );
        }}
        refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }
        keyExtractor={item => item.idcategorias}/>
     
          </View>
          : 
          null
        }


</View>
      


 
      

    );
  }
}

const styles = StyleSheet.create({

listaPromoEmp:{
  width: '100%',
backgroundColor: '#fff',
elevation: 4
},

promoEmp:{
height: 90,
margin: 5,
flexDirection: 'row',
backgroundColor: '#fff',
elevation: 3,
},


logoPromoEmp:{
width: 110,
height: 110,
borderRadius: 55,
position: 'absolute',
top: -5,
left: -35,
borderWidth: 3,
zIndex: 2,
elevation: 4
},

txtPromoEmp:{
  flex: 1,
  justifyContent: 'center' ,
},

tituloPromoEmp:{
textAlign: 'right',
paddingLeft: 75,
paddingRight: 8,
justifyContent: 'center',
fontFamily: 'CaviarDreams_Bold',
color: '#4B4B4D',
fontWeight: 'bold',
fontSize: 11,

},

txtDescPromoEmp:{
flex: 3,
paddingLeft: 80,
paddingTop: 5,
paddingRight: 30,
},

descripcionPromoEmp:{
textAlign: 'left',
fontSize: 11,
fontFamily: 'CaviarDreams'
},

imgPromo:{
  width: '100%',
  height: '100%',
  position: 'absolute',

},

porcientoPromoEmp:{
position: 'absolute',
bottom: -5,
right: -10,
width: 50,
height: 50,
textAlign: 'center',
justifyContent: 'center' ,
alignItems: 'center' ,
zIndex: -1
},

porcientoEmp:{
color: '#fff',
fontFamily: 'CaviarDreams_Bold'
},

  tituloDirectorio:{      
   fontFamily: 'CaviarDreams',
  margin: 3,
  fontSize: 10,
  color: '#000',
  margin: 5,
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