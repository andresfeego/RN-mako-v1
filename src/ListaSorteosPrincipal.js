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

export default class ListaSorteosPrincipal extends Component<{}> {


//.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);
     this.state = {
      refreshing: false,
      dsPromosEmp: [],



      };

  }


//............................DID AND WILL MOUNT METHOD .............................

componentDidMount(){


  this.getPromosEmp(0);

          this.actualizar();
}

 



  
actualizar(){


     this.getPromosEmp(0).then(() =>{
  
  let that = this;

  setTimeout(function() {
        that.actualizar();
        }, 5000);
  })

}

//............................FUNCIONES PARA ARMADO DE EMPRESA COMPLETA .............................





getPromosEmp(id){

    return fetch('http://www.mako.guru/listadosApp/returnSorteosGeneral.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      codigo: id,
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
             <Text style={styles.tituloSorteos}> SORTEOS </Text>

    <FlatList
    style={styles.lista}
        data={this.state.dsPromosEmp}
        horizontal={true}
        renderItem={({item}) => {
      
        let logoPromoEmp = 'https://www.mako.guru/directorio/'+item.url_logo;
          return(

              <TouchableOpacity style={styles.promoEmp} onPress={()=> {item.tipoLink == 1? this.callBrowser(item.link): this.abrirEmpresa(item.codigo)}}>
           
                <Image style={[styles.logoPromoEmp,{borderColor: item.color}]} source={{uri:logoPromoEmp}}/>
               
                <View style={[styles.txtPromoEmp]}>
                  <Text style={[styles.tituloPromoEmp,{backgroundColor: item.color}]}> {item.titulo.toUpperCase()} </Text>
                                    
                  <View style={styles.txtDescPromoEmp}>
                    <Text style={styles.descripcionPromoEmp}> {item.descripcion} </Text>
                    
                 

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
height: 130,
marginTop: 10,
marginBottom: 5,
backgroundColor: '#fff',
elevation: 4
},

promoEmp:{
width: 250,
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
flex: 1,
textAlign: 'left',
paddingLeft: 65,
fontSize: 15,
justifyContent: 'center',
fontFamily: 'CaviarDreams_Bold',
color: '#fff',
},

txtDescPromoEmp:{
flex: 3,
paddingLeft: 75,
paddingTop: 5,
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

tituloSorteos:{
  fontFamily: 'CaviarDreams',
  margin: 3,
  fontSize: 10,
  color: '#000',
  margin: 5,
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