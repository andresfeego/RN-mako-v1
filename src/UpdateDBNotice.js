import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'comerci.db' , createFromLocation: '~comercio.db'})


class UpdateDBNotice extends PureComponent {
  state = {
    actualizando: false,
    porcientoActu : 0,
  };


componentWillMount(){
	 this.updateDB();
}


 //...................................ACTUALIZA BASE DE DATOS OFF LINE................................................. 



updateDB(){


  var user = 'nada';
    return fetch('http://www.mako.guru/listadosApp/sync.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: user,
      
    })
  
  })
    .then((response) => response.json())
      .then( async (responseJson) =>{
           
    var parameters=[],
        bigqery="";
     var daos= [];
     var daos= responseJson;
    // magic
          var contadorOffline= await this.consultaContOffline();



if(contadorOffline < responseJson.length-1){
   db.transaction( (tx) => {
      return tx.executeSql( "DELETE FROM comerciante ;");
     });

      const porcActual = (100/daos.length); 
      

       daos.forEach(  async (item) => {

                      
                   
                  var grabo = await this.grabar(item);

                  


                  this.setState({
                    porcientoActu: this.state.porcientoActu+ porcActual,
                  })
                  






            })



   }else{
    this.setState({
      porcientoActu: 100
    })
   }


      })

.catch((error) => {
        alert('error fetch: '+error);
      }); 

  Keyboard.dismiss();



}






async grabar(item) {
   return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        console.warn('ok');
        tx.executeSql( "INSERT  INTO comerciante (codigo, nombre, descripcion, direccion, keys, telefonop, whatp, codCiudad, ciudad, color, categoria) VALUES ('"+item.codigo+"', '"+item.nombre+"', '"+item.descripcion+"', '"+item.direccion+"', '"+item.palabras_clave+"', "+item.telefono+", "+item.wp+", "+item.codCiu+", '"+item.nomCiu+"', '"+item.color+"', "+item.categoria+");", [], (_, { rows }) => {
          resolve('ok');
      });
    }, null, null);
  });      

}

async consultaContOffline() {
   return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        console.warn('consultando...');
        tx.executeSql( "SELECT Count(*) as c FROM comerciante ", [], (_, { rows }) => {
          var contadorOffline=rows.item(0).c;
          resolve(contadorOffline);
      });
    }, null, null);
  });      

}

//......................................................................................................................^^^^^^^^^^^^^^^^^^^^^^



  render() {
   
         	let porciento = this.state.porcientoActu + '%';
           return (
                  
            <View>
                {this.state.porcientoActu < 99 ?

                  <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>Actualizando directorio sin internet...</Text>
                    <Text style={styles.offlineText2}>{Math.round(this.state.porcientoActu)}</Text>
                    <View style={[styles.barraCarga,{width: porciento}]} />
                  </View>

                : null}

                </View>
          );
           

  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#F33446',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width,
    position: 'relative',
  },
  
  offlineText: { 
  	color: '#fff' 
  },

    offlineText2: { 
  	color: '#fff' ,
  	fontSize: 10
  },

  barraCarga:{
  	backgroundColor: '#34c1bb',
  	height: 5,
  	borderRadius: 5,
  }
});

export default UpdateDBNotice;