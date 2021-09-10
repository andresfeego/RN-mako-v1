/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

const {width}= Dimensions.get('window')

export default class ListEmpresas extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      ciudad: this.props.ciudad,
      busRazon: this.props.busRazon,
      busServicios: this.props.busServicios,
      busCategoria: this.props.busCategoria,
      refreshing: false,
      ds: '',
      actu: 0,
      
      };

     
  }



componentWillMount(){

          this.getEmpresas(this.props.ciudad,'','',this.props.cat);
this.actualizar();
} 



  
componentWillReceiveProps(nextProps: Props) {
  this.setState({
    ciudad: nextProps.ciudad,
        busRazon: nextProps.busRazon,
        busServicios: nextProps.busServicios,
        busCategoria: nextProps.busCategoria,
          })
 
    this.getEmpresas(nextProps.ciudad, nextProps.busRazon, nextProps.busServicios ,nextProps.busCategoria);

  }

getEmpresas(ciudad, razon, servicio, categoria){
   

    return fetch('http://www.mako.guru/listadosApp/returnEmpresas.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      ciudad: ciudad,
      busRazon: razon,
      busServicios: servicio,
      busCategoria: categoria,
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         //console.warn('antes', responseJson);
         
          if (responseJson != 0) {
            data=[];
            data= responseJson;
            this.setState({
              ds: data,
            })

          } else{
            criterios = "Sin resultados";
             data=[{"0":"0","orden":"0","1":"2018-03-02 00:34:00","fechaRegistro":"2018-03-02 00:34:00","2":"0","oculto":"0","3":"0","activo":"0","4":"CMWSRMJN","codigo":"CMWSRMJN","5":"Sin Resultados","nombre":"Sin Resultados","6":criterios,"descripcion":criterios,"7":"Carrera 1 # 1 - 01","direccion":"Carrera 1 # 1 - 01","8":"361","barrio":"361","9":"1","vc_horas":"1","10":"0","domicilio":"0","11":"0","costo_domicilio":"0","12":"sin web","pagina_web":"sin web","13":"logos\/cat\/nohay.png","url_logo":"logos\/cat\/nohay.png","14":"0","categoria":"0","15":"Nada","palabras_clave":"Nada","16":"0","ubicacion_maps":"0","17":"4","visto":"4","18":"0","listado":"0","19":"0","cantidad_de_votos":"0","20":"0","nuemro_de_votantes":"0","21":"1","tipo_comercio":"1","22":"5.5348375","lat":"5.5348375","23":"-73.3607735","lng":"-73.3607735","24":"rgb(52,193,187)","color":"rgb(52,193,187)"}];
            this.setState({
              ds: data,
            })
           
          };
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}

actualizar(){


     this.getEmpresas(this.state.ciudad, this.state.busRazon, this.state.busServicios , this.state.busCategoria).then(() =>{
  
  let that = this;

  setTimeout(function() {
        that.actualizar();
        }, 1000);
  })

}

_onRefesh(){
  
  this.setState({
    refreshing: true,
  });
     this.getEmpresas(this.state.ciudad, this.state.busRazon, this.state.busServicios , this.state.busCategoria).then(() =>{
    this.setState({
      refreshing:false,
    })
  })

  
 
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



contarVisita(codigo){
    return fetch('http://www.mako.guru/listadosApp/contarVisita.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}



renderPromo(numPromo){
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/promoIcon.png';

  if (numPromo > 0) {
    return(
      <View style={[styles.contPromo]}>

                  <View style={[styles.promoIcon]}>
                    <Image style={[styles.imgPromo]} source={{ uri : urlpromo}}/>
                  </View>
                  
                  <Text style={styles.txtPromo}> {numPromo} </Text>
      </View>
      )
  } else{
    return null;
  };
};


renderInfo(numInfo){
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/infoIcon.png';

  if (numInfo > 0) {
    return(
      <View style={[styles.contPromo]}>

                  <View style={[styles.infoIcon]}>
                    <Image style={[styles.imgPromo]} source={{ uri : urlpromo}}/>
                  </View>
                  
                  <Text style={styles.txtPromo}> {numInfo} </Text>
      </View>
      )
  } else{
    return null;
  };
};

renderVisto(numVisto){
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/vistoIcon.png';

  if (numVisto > 0) {
    return(
      <View style={[styles.contPromo]}>
                  
                  <View style={[styles.vistoIcon]}>
                    <Image style={[styles.imgPromo]} source={{ uri : urlpromo}}/>
                  </View>

                  <Text style={styles.txtPromo}> {numVisto} </Text>

      </View>
      )
  } else{
    return null;
  };
};



  render() {
        
       


    return (
  <View style={styles.lista}>

    <FlatList
    numColumns={3}
    style={styles.lista}
        data={this.state.ds}
        renderItem={({item}) => {
 
      let color=item.color;
      let opacit = {opacity: 1};  

        if (item.activo == 0) {
          color='lightgray';  
          opacit = {opacity: 0.2};  
        };

        const backColor = {backgroundColor: color};
        const borderColor = {borderColor: color};
        const Color = {color: color};
        const borderBottomColor = {borderBottomColor: color};


        const urllogo = 'https://www.mako.guru/directorio/'+item.url_logo;


          return(

            <TouchableOpacity style={[styles.empresa,borderBottomColor,opacit]}  onPress={() => this.handlePress(item)} >

                <View  style={[styles.contPromos]}>
                  {this.renderVisto(item.visto)}
                  {this.renderInfo(item.numInfo)}
                  {this.renderPromo(item.numPromo)}
                </View>

                  <View style={[styles.logo]}>
                    <Image style={[styles.image, borderColor]} source={{ uri : urllogo}}/>
                  </View>
                  
                  <View style={[styles.texto]}>
                    <Text style={[styles.nombre, Color]}> {item.nombre.toUpperCase()} </Text>
                    <Text style={styles.descripcion}> {this.MaysPrimera(item.descripcion.toLowerCase())} </Text>
                  </View>
                  
               

                  <View style={[styles.ver]}>
                    <Text style={{color: 'gray'}}>{">"}</Text>
                  </View>


            </TouchableOpacity>

            );
        }}
        refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }
        keyExtractor={item => item.orden}/>
     
          </View>


    
    );
  }
}

const styles = StyleSheet.create({

lista:{
width: '100%',
},

  empresa:{
  width: '47%',
  backgroundColor: '#fff',
  height: ((width/2)+55),
  margin: 5,
  borderTopColor: 'lightgray',
  borderTopWidth: 0.5,
  borderBottomWidth: 5,
  elevation   : 5,

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
  width: 55,
  height: 35,
  zIndex: 10000,
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
  justifyContent: 'flex-start' ,
  alignItems: 'center' ,
  marginVertical: 3,
  borderColor: 'lightgray',
  borderWidth: 0.5,
  flexDirection: 'row',

},


txtPromo:{
fontSize: 10,
textAlign: 'left',
},

promoIcon:{
width: 28,
height: 28,
borderRadius: 28,
backgroundColor: '#f54848',
marginLeft: 1,
},

infoIcon:{
width: 28,
height: 28,
borderRadius: 28,
backgroundColor: '#79DB48',
marginLeft: 1,
},

vistoIcon:{
width: 28,
height: 28,
borderRadius: 28,
backgroundColor: '#00A0E3',
marginLeft: 1,
},

imgPromo:{
width: 30,
height: 30,
},

image:{
    width: '100%',
    height: '100%',
    borderWidth: 0,
    
},

texto:{
  flex: 1,
},

nombre:{
  fontWeight: 'bold',
  fontSize: 13,
  textAlign: 'center',
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

});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */