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
  Clipboard,
  Animated,
  Share
} from 'react-native';

import {
  shareOnFacebook,
  shareOnTwitter,
} from 'react-native-social-share';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Telefonos from './Telefonos.js';
import Mails from './Mails.js';
import Horarios from './Horarios.js';
import VChorasDomi from './VChorasDomi.js';
import {Actions} from 'react-native-router-flux';
import MapView from 'react-native-maps';

export default class DetralleVenta extends Component<{}> {


//.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);

     this.state = {
      refreshing: false,
      orden: '',
      fechaRegistro: '',
      activo: '',
      codigo: this.props.empresa.codigo,
      nombre: '',
      descripcion: '',
      direccion: '',
      VChoras: '',
      domicilio: '',
      costo_domicilio: '',
      pagina_web: '',
      url_logo: '',
      categoria: '',
      palabras_clave: '',
      ubicacion_maps: '',
      visto: '',
      listado: '',
      cantidad_de_votos: '',
      numero_de_votantes: '',
      tipo_comercio: '',
      vip: '',
      afiliacion_vip: '',
      lat: 0,
      lng: 0,
      numSort: 0,
      numPromo: 0,
      numInfo: 0,
      colorCiudad: '',
      barrio: '',
      ciudad: '',
      idCiudad: '',
      correos:[],
      horarios:[],
      telefonos:[],
      altoMapa: new Animated.Value(70),
      abrirMapa: 0,
      delta: 0.005,
      imagenes:[],


      };

     
  }

//.................................METODOS LLAMADAS Y WHATSAPP........................


callBrowser = (url) =>{
  if (url != 'sin web') {
    const Hurl = ('http://'+url); 

   Linking.canOpenURL(Hurl).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(Hurl);
   }
 }).catch(err => console.error('An error occurred', err));
   };
}


whatsapp = (phone) =>{
  const url = 'whatsapp://send?text=Buen día, te contacto por medio de www.mako.guru, quisiera...&phone=+57'+phone; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}


  tweet() {

    shareOnTwitter({
        'text':'Global democratized marketplace for art',
        'link':'https://artboost.com/',
        'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
        //or use image
        'image': 'artboost-icon',
      },
      (results) => {
        console.log(results);
      }
    );
  }

  facebookShare() {
    let mensa = 'https://mako.guru/directorio/directorio3.php?id='+this.state.codigo;

            Share.share(
            {
                
              message: mensa
            
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));

  }

//............................DID AND WILL MOUNT METHOD .............................

componentWillMount(){

  this.getEmpresa();
  this.getCiudad();
  this.getHorarios();
  this.getTelefonos();
  this.getCorreos();
  this.getImagenes();
}


//............................FUNCIONES PARA ARMADO DE EMPRESA COMPLETA .............................


getEmpresa(){

    return fetch('http://www.mako.guru/listadosApp/empresaXcodigo.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
            orden: responseJson.orden,
            fechaRegistro: responseJson.fechaRegistro,
            activo: responseJson.activo,
            codigo: responseJson.codigo,
            nombre: responseJson.nombre,
            descripcion: responseJson.descripcion,
            direccion: responseJson.direccion,
            VChoras: responseJson.vc_horas,
            domicilio: responseJson.domicilio,
            costo_domicilio: responseJson.costo_domicilio,
            pagina_web: responseJson.pagina_web,
            url_logo: responseJson.url_logo,
            categoria: responseJson.categoria,
            palabras_clave: responseJson.palabras_clave,
            ubicacion_maps: responseJson.ubicacion_maps,
            visto: responseJson.visto,
            listado: responseJson.listado,
            cantidad_de_votos: responseJson.cantidad_de_votos,
            numero_de_votantes: responseJson.numero_de_votantes,
            tipo_comercio: responseJson.tipo_comercio,
            vip: responseJson.vip,
            afiliacion_vip: responseJson.afiliacion_vip,
            lat: responseJson.lat,
            lng: responseJson.lng,
            numPromo: responseJson.numPromo,
            numSort: responseJson.numSort,
            numInfo: responseJson.numInfo,
 
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getCiudad(){

    return fetch('http://www.mako.guru/listadosApp/barriociudadXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
          colorCiudad: responseJson.color,
          barrio: responseJson.nombreBarrio,
          ciudad: responseJson.nombre,
          idCiudad: responseJson.id_ciudad,
 
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getHorarios(){

    return fetch('http://www.mako.guru/listadosApp/horariosXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         
       
       this.setState({
            horarios: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getTelefonos(){

    return fetch('http://www.mako.guru/listadosApp/telefonosXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
            telefonos: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getImagenes(){

    return fetch('http://www.mako.guru/listadosApp/imagenesXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
          data =[];
          if (responseJson != 0) {
             this.setState({
            imagenes: responseJson,
       })
          } else{
             this.setState({
            imagenes: data,
       })
          };
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getCorreos(){

    return fetch('http://www.mako.guru/listadosApp/correosXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
            correos: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}







parseTipoHorario(tipoHorario){
   let labelHorario = '';
  switch(item.tipoHorario){

    case 1:  labelHorario = 'Lunes a Viernes';

    break;

    case 2: labelHorario = 'Sábados';

    break;

    case 3: labelHorario = 'Lunes a sábados';

    break;

    case 4: labelHorario = 'Domingos y festivos';

    break;

    case 5: labelHorario = 'Lunes a domingo';

    break;

    case 6: labelHorario = 'Lunes festivos';

    break;

    case 7:labelHorario = 'Lunes a jueves'; 

    break;

    case 8: labelHorario = 'viernes y sábados';

    break;

    case 9: labelHorario = 'Viernes, Sábados y Domingos';

    break;

  }

  return labelHorario;
}



irlistSort(cod){

Actions.listSort({cod})

}


irlistPromos(cod){

Actions.listPromos({cod})

}

irlistInfos(cod){

Actions.listInfos({cod})

}

abrirMapa(){

  if (this.state.abrirMapa == 0) {
    this.setState({
      abrirMapa: 1,
      delta: 0.0002,

    })
    Animated.timing(                  // Animate over time
      this.state.altoMapa,            // The animated value to drive
      {
        toValue: 500,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start();       
  } else{
      this.setState({
      abrirMapa: 0,
      delta: 0.01,

    })

        Animated.timing(                  // Animate over time
      this.state.altoMapa,            // The animated value to drive
      {
        toValue: 70,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start(); 
  };    

}

renderBtnPromo(numPromo){
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/promoIcon.png';

  if (numPromo > 0) {
    return(
      <TouchableOpacity style={[styles.contPromo, styles.promo1]} onPress={() => this.irlistPromos(this.state.codigo)} >
                  
                  <View style={[styles.promoIcon]}>
                    <Image style={[styles.imgPromo]} source={{ uri : urlpromo}}/>
                  </View>

                  <Text style={styles.txtPromo}> {'Ver '+numPromo+' promociones que tenemos para ti'} </Text>

      </TouchableOpacity>
      )
  } else{
    return null;
  };
};


renderBtnSort(numSort){
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/sorteoIcon.png';

  if (numSort > 0) {
    return(
      <TouchableOpacity style={[styles.contPromo, styles.promo1]} onPress={() => this.irlistSort(this.state.codigo)} >
                  
                  <View style={[styles.SortIcon]}>
                    <Image style={[styles.imgPromo]} source={{ uri : urlpromo}}/>
                  </View>

                  <Text style={styles.txtPromo}> {'Ver sorteos'} </Text>

      </TouchableOpacity>
      )
  } else{
    return null;
  };
};


renderBtnInfo(numInfo){
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/infoIcon.png';

  if (numInfo > 0) {
    return(
      <TouchableOpacity style={[styles.contPromo]} onPress={() => this.irlistInfos(this.state.codigo)}>
                  
                  <View style={[styles.infoIcon]}>
                    <Image style={[styles.imgPromo]} source={{ uri : urlpromo}}/>
                  </View>

                  <Text style={styles.txtPromo}> {'Ver '+numInfo+' informativos que tenemos para ti'} </Text>

      </TouchableOpacity>
      )
  } else{
    return null;
  };
};


copiarLink() {
  Clipboard.setString('https://mako.guru/directorio/directorio3.php?id='+this.state.codigo);


  Alert.alert(
  'Hecho !',
  'se ha copiado el link al portapapeles',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}



whatsapp = () =>{
  
  const url = 'whatsapp://send?text=https://mako.guru/directorio/directorio3.php?id='+this.state.codigo; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
  
}



galeria(indice){

  let array = this.state.imagenes.map((item,i) =>  {url = 'https://www.mako.guru/directorio/imagenes/empresas/'+this.state.codigo+'/'+item.url+'.jpg';return {caption: item.nombre, source: { uri: url } };} );
  Actions.Galeria({imagenes: array, index: indice});

};
//............................FUNCIONES PARA RENDER .............................


  render() {
   




    let pagina = this.state.pagina_web;
    let newPagina = this.state.pagina_web;
    let iconoweb = 'ios-globe-outline';

    const palabra = 'facebook.';
    const palabra1 = 'fb.';

      if (pagina.indexOf(palabra) != -1 || pagina.indexOf(palabra1) != -1) {
        newPagina= 'Ver Perfil'
        iconoweb= 'logo-facebook'
      };

    let urllogo = { uri : 'https://www.mako.guru/directorio/'+this.state.url_logo};
    
   

     const backColor={
      backgroundColor: this.state.colorCiudad,
      
    };
    

    const borBottColor={
      borderColor: 'lightgray',
      borderBottomWidth: 3,
      borderTopWidth: 1
    };

let { altoMapa} = this.state;


    return (
       

      <View style={styles.container}> 
        <ScrollView style={styles.scrollcontnido}> 

          <View style={[styles.header,backColor]}>
                <Image style={[styles.fondoHeader]} source={require('./imgs/fondoheader0.png')}/>
                <Image style={[styles.imgMakoT]} source={require('./imgs/makoTransparente.png')}/>
                <Image style={[styles.image]} source={urllogo}/>
                <Text style={styles.nombre}> {this.state.nombre.toUpperCase()} </Text>



          </View>


          <View style={styles.contenido}>
            <Text style={styles.descrip}> {this.state.descripcion} </Text>

              {this.renderBtnSort(this.state.numSort)}
              {this.renderBtnPromo(this.state.numPromo)}
              {this.renderBtnInfo(this.state.numInfo)}

    <View style={styles.cajalink}>

      <TouchableOpacity style={styles.touch} onPress={()=> this.copiarLink()}  > 
        <View style={styles.circulo}>
                <Icon2 name="md-copy" size={30} color={this.state.colorCiudad}/>
          </View>
          <Text style={[styles.catego]}> Copiar link</Text>
      </TouchableOpacity>

       <TouchableOpacity style={styles.touch} onPress={()=> this.facebookShare()}  > 
        <View style={styles.circulo}>
                <Icon2 name="md-share" size={30} color={this.state.colorCiudad}/>
          </View>
          <Text style={[styles.catego]}> Compartir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touch} onPress={()=> this.whatsapp()}  > 
        <View style={styles.circulo}>
                <Icon2 name="logo-whatsapp" size={30} color={this.state.colorCiudad}/>
          </View>
          <Text style={[styles.catego]}> Compartir vía Whatsapp</Text>
      </TouchableOpacity>


    </View>



            {this.state.imagenes.length > 0?
              <View style={[styles.cajainfo]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon name="burst-mode" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Imagenes'} </Text>
              </View>

              <View style={[styles.cajaImagenes]}>
                <FlatList
                  data={this.state.imagenes}
                  horizontal={true}
                  renderItem={({item, index}) => {

                    url = 'https://www.mako.guru/directorio/imagenes/empresas/'+this.state.codigo+'/'+item.url+'.jpg'
                    return(

                        
                    <TouchableOpacity style={[styles.imagenes]} onPress={() => this.galeria(index)}>
                      <Image style={[styles.imagen]} source={{ uri : url}}/>
                    </TouchableOpacity>


                      )
                  }}
                  keyExtractor={item => item.id_telefono}/>

              </View>
            </View>
            :
            null

            }


             {this.state.lat != 0 ?
                <View style={[styles.cajainfo]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon2 name="md-map" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Ver en mapa'} </Text>
              </View>

              <Animated.View style={[styles.inforMapa, {height: this.state.altoMapa}]}>
                <MapView style={styles.mapa} scrollEnabled={false} customMapStyle={customMap} region={{latitude: parseFloat(this.state.lat) , longitude: parseFloat(this.state.lng) , latitudeDelta: this.state.delta, longitudeDelta: this.state.delta}}>
                  <MapView.Marker  pinColor={this.state.colorCiudad} coordinate={{latitude: parseFloat(this.state.lat) , longitude: parseFloat(this.state.lng)}} title={this.state.nombre.toUpperCase()} description={this.state.descripcion}/>
                </MapView>

                <TouchableOpacity style={[styles.iconosMapa,{borderColor: this.state.colorCiudad,marginTop: 5,height: 30}]} onPress={() => this.abrirMapa()}>
                  <Icon name={this.state.abrirMapa == 0 ? 'crop-free' : 'crop-din'} size={30} color={this.state.colorCiudad}/>
                  <Text style={[styles.txtAction,{color: this.state.colorCiudad}]} > {this.state.abrirMapa == 0 ? 'Expandir mapa' : 'Contraer mapa'} </Text>
                </TouchableOpacity>

              </Animated.View>

            </View>
            : null
             }


            <View style={[styles.cajainfo]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon name="place" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Dirección'} </Text>
              </View>

              <View style={styles.infor}>
                <Text style={styles.txtinfo}> {this.state.direccion} </Text>
                <Text style={styles.txtinfo}> {[this.state.barrio ,' - ' ,this.state.ciudad]} </Text>
              </View>

            </View>




            <View style={[styles.cajainfolist]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon name="phone" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Telefonos'} </Text>
              </View>

              <View style={styles.infor}>
               
                <FlatList
                style={styles.telef}
                  data={this.state.telefonos}
                  renderItem={({item}) => <Telefonos telefono={item} color={this.state.colorCiudad}/>}
                  keyExtractor={item => item.id_telefono}/>

              </View>


            </View>

            <View style={[styles.cajainfolist]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon2 name="ios-mail" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Correos'} </Text>
              </View>

              <View style={styles.infor}>
               
                <FlatList
                style={styles.telef}
                  data={this.state.correos}
                  renderItem={({item}) => <Mails mail={item} color={this.state.colorCiudad}/>}
                  keyExtractor={item => item.idcorreo}/>

              </View>


            </View>



              <View style={[styles.cajainfolist]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon2 name={''+iconoweb} size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Pagina web'} </Text>
              </View>


            <TouchableOpacity style={[styles.detalleBotones]} onPress={()=> this.callBrowser(pagina)}>

                {newPagina != 'sin web' ?
                <View style={[styles.btnAccion,{backgroundColor: '#91D8F7'}]}>
                  <Icon2 name={'ios-globe-outline'} size={20} color={'white'} style={[styles.iconoLlamada]}/>
                  <Text style={styles.offlineText4}> {newPagina} </Text>
                </View>
                : null}

              </TouchableOpacity>
            </View>




             <View style={[styles.cajainfolist]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon2 name="ios-time" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Horarios'} </Text>
              </View>

              <View style={styles.infor}>
               
                  <FlatList
                  data={this.state.horarios}
                  renderItem={({item}) => <Horarios horario={item} color={this.state.colorCiudad}/>}
                  keyExtractor={item => item.idjornadas}/>


                  

              </View>


            </View>

            <View style={[styles.iconos,borBottColor]}>
              <Icon name="motorcycle" size={30} color={this.state.colorCiudad}/>
              <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Adicionales'} </Text>
            </View>

            <VChorasDomi domicilio={this.state.domicilio} costo={this.state.costo_domicilio} vchoras={this.state.VChoras} color={this.state.colorCiudad}/>

            <Text style={[styles.txtciudad,backColor]}> {this.state.ciudad} </Text>

          </View>

        </ScrollView>


        


      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  height: '100%',
  backgroundColor: '#fff',
},

scrollcontnido:{
  flex:1,
  flexDirection: 'column',
},


detalleBotones:{
  marginVertical: 5,
  width: '90%',
  flexDirection: 'row',
  marginLeft: 35
},

btnAccion:{
    flex: 1,
    height: 35,
    margin: 5,
    borderRadius: 20,
    flexDirection: 'row' ,
    textAlignVertical: 'center' ,
    justifyContent: 'center' ,
    alignItems: 'center' ,
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


header:{
  flex: 1,
  height: 187,
  justifyContent: 'flex-end',
  alignItems: 'center', 
  elevation: 10,

},

imgMakoT:{
  width: '150%',
  height: '100%',
  position: 'absolute',
  top: -10,
  right: -250,
  resizeMode: Image.resizeMode.contain,
},

fondoHeader:{
  width: '100%',
  position: 'absolute',
  top: '-110%',
  left: 0,
  resizeMode: Image.resizeMode.contain,
},

image:{
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    marginHorizontal: 30,
    borderColor: '#1C252A',
  },

nombre:{
  color: '#fff',
   fontWeight: 'bold',
  fontSize: 17,
  textAlign: 'center',
  marginHorizontal: 5,
  marginVertical: 10
},

descrip:{
  color: '#fff',
  fontSize: 14,
  textAlign: 'center',
  paddingHorizontal: 5,
  paddingVertical: 5,
  backgroundColor: '#34c1bb',
  elevation: 5
}, 

contenido:{
  flex: 1,

},

promo1:{
  marginTop: 20,
  
},

contPromo:{
  backgroundColor: '#fff',
  flex: 1,
  height: 55,
  zIndex: 10000,
  justifyContent: 'flex-start' ,
  alignItems: 'center' ,
  flexDirection: 'row',
  elevation: 4,
  marginVertical: 3,
},



txtPromo:{
fontSize: 14,
flex: 1,
},

promoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#f54848',
marginBottom: 5,
marginHorizontal: 5,
},

infoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#79DB48',
marginBottom: 5,
marginHorizontal: 5,

},

SortIcon:{
  width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#463CE1',
marginBottom: 5,
marginHorizontal: 5,
},

imgPromo:{
width: 30,
height: 30,
},

cajainfo:{
  flex: 1,
  flexDirection: 'column',
  paddingVertical: 20,
  justifyContent: 'center',

},

cajalink:{
flex: 1,
  flexDirection: 'row',
  paddingVertical: 10,
  justifyContent: 'center',
  marginVertical: 4,
  elevation: 4,

},

cajainfolist:{
  flex: 1,
  flexDirection: 'column',
  paddingRight: 0,
    marginVertical: 4,
  elevation: 4,
  

},


iconos:{
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center', 
  paddingLeft: 10,
  flexDirection: 'row',
  borderBottomWidth: 3,
},

infor:{
  flex: 1,
  flexDirection: 'column',
 
},

inforMapa:{
 flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
},

mapa:{
  width: '100%',
  flex: 1
},

txtinfo:{
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  textAlign: 'right',
  paddingRight: 20,
   fontSize: 16,
},
txtinfo2:{
  //justifyContent: 'center',
  //alignItems: 'center',
  flex: 1,
  textAlign: 'right',
  fontSize: 16,
  paddingVertical: 10,
  paddingRight: 20,
  flexWrap: 'nowrap', 


},
texto:{
  fontSize: 10,
  color: '#fff',
},

txtciudad:{
  backgroundColor: '#333',
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#fff',
},

telef:{
  flex: 1,
},

txtTitulo:{
  color: '#fff'
},

titulo:{
   fontFamily: 'CaviarDreams',
  margin: 3,
  fontSize: 10,
  color: '#000',
  margin: 5,
},


iconos2:{
  justifyContent: 'center',
  alignItems: 'center', 
  flexDirection: 'row',
  paddingHorizontal: 5,
  borderRadius: 4,
  marginLeft: 15,
  height: '80%',
  flex: 1,
  elevation: 2,
  marginHorizontal: 10,
  borderWidth: 1,
  maxWidth: '42%'

},

iconosMapa:{
  justifyContent: 'center',
  alignItems: 'center', 
  flexDirection: 'row',
  paddingHorizontal: 5,
  borderRadius: 4,
  marginLeft: 15,
  elevation: 2,
  marginHorizontal: 10,
  borderWidth: 1,
  maxWidth: '42%'

},

infor2:{
flex: 1,
flexDirection: 'column',
justifyContent: 'center',
},

cajainfo2:{
  width: '100%',
  flexDirection: 'row',
  borderBottomColor: '#C5C6C6',
  borderBottomWidth: 0.5,
  paddingVertical: 10
},

txtAction:{
  fontSize: 8,
  paddingHorizontal: 3,
  borderRadius: 4,
  marginVertical: 2,
},

touch:{
  alignItems: 'center',
  width: 65,
  margin: 5,
  marginHorizontal: 10
    
},

circulo: {
  width: 50,
  height: 50,
  backgroundColor: '#fff',
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center', 
},

catego:{
  color: 'gray',
  fontSize: 10,
  textAlign: 'center',
},

icono:{
width: 30,
resizeMode: Image.resizeMode.contain,

},

cajaImagenes:{
  flex: 1,
  height: 120,

},

imagenes:{
backgroundColor: '#fff',
marginHorizontal: 5,
paddingHorizontal: 5,
paddingTop: 5,
paddingBottom: 10

},

imagen:{
  height: '100%',
  width: 100,
resizeMode: Image.resizeMode.cover,

},

});

const customMap = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2e3638"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#2e3638"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#2e3638"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#d8304e"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#d8304e"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#d8304e"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#2e3638"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

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