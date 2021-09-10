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
  RefreshControl,
  Keyboard,
  NetInfo,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import ContactoOffline from './ContactoOffline';


var SQLite = require('react-native-sqlite-storage')

var db = SQLite.openDatabase({name: 'comerci.db'})


export default class ListaOffline extends Component<{}> {


constructor(props) {
  super(props);

  this.state = {
  	ds: [],
    data: this.props.data,
    ciudad: 0,
    busKey: '',
    busCategoria: '',
  };


 this.getEmpresas(this.state.busKey,this.state.busCategoria,this.state.ciudad);

}


//........................................DID AND WILL MOUNT METHOD ..................................


componentWillReceiveProps(nextProps: Props) {
	
    this.getEmpresas(nextProps.busKey,nextProps.busCat,nextProps.busCiu);

  }

//............................FUNCIONES PARA generar carta presentacion  .............................

getEmpresas(busKey, busCat, busCiu){
	console.warn(busCat);
	console.warn(busCiu);

	if (busKey || busCat != '' || busCiu != 0) {

				if (busCiu == 0) {
					if (busCat == '') {
								db.transaction((tx) => {
									tx.executeSql("SELECT * FROM comerciante as co where co.keys like ? or co.nombre like ? or co.descripcion like ? ", ['%'+busKey+'%','%'+busKey+'%','%'+busKey+'%'], (tx, results) => {

										var len=results.rows.length;
										var data = [];

										for(let i=0; i<len; i++){
											var row=results.rows.item(i);

											data.push(row);
										}


										this.setState({
											ds: data
										})

									});
								});


					} else{

							db.transaction((tx) => {
								tx.executeSql("SELECT * FROM comerciante as co where (co.keys like ? or co.nombre like ? or co.descripcion like ?) and co.categoria = ?", ['%'+busKey+'%','%'+busKey+'%','%'+busKey+'%',busCat], (tx, results) => {

									var len=results.rows.length;
									var data = [];

									for(let i=0; i<len; i++){
										var row=results.rows.item(i);

										data.push(row);
									}


									this.setState({
										ds: data
									})

								});
							});

					};
				} else{

					if (busCat == '') {

							db.transaction((tx) => {
								tx.executeSql("SELECT * FROM comerciante as co where  (co.keys like ? or co.nombre like ? or co.descripcion like ?) and co.codCiudad = ? ", ['%'+busKey+'%','%'+busKey+'%','%'+busKey+'%',busCiu], (tx, results) => {

									var len=results.rows.length;
									var data = [];

									for(let i=0; i<len; i++){
										var row=results.rows.item(i);

										data.push(row);
									}


									this.setState({
										ds: data
									})

								});
							});

			     
					} else{
						
							db.transaction((tx) => {
								tx.executeSql("SELECT * FROM comerciante as co where  (co.keys like ? or co.nombre like ? or co.descripcion like ?) and co.codCiudad = ? and co.categoria = ?", ['%'+busKey+'%','%'+busKey+'%','%'+busKey+'%',busCiu,busCat], (tx, results) => {

									var len=results.rows.length;
									var data = [];

									for(let i=0; i<len; i++){
										var row=results.rows.item(i);

										data.push(row);
									}


									this.setState({
										ds: data
									})

								});
							});

					};
				};


	} else{
     db.transaction((tx) => {
      tx.executeSql("SELECT * FROM comerciante ", [], (tx, results) => {

          var len=results.rows.length;
          var data =[];
                for(let i=0; i<len; i++){
                 var row=results.rows.item(i);
                 data.push(row);

                 }
          
          	this.setState({
          		ds: data
          	})
        });
    });

	};
}


//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    
      return (
       

      <View style={styles.container}> 
	


		  <FlatList
        style={styles.lista}
        data={this.state.ds}
        renderItem={({item}) => {

          return(

           
                    <ContactoOffline item={item} />
                  
            );
        }}
        
        //stickyHeaderIndices={[0]}
        keyExtractor={item => item.codigo}/>
    
      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
width: '100%',
backgroundColor: '#fff',
elevation: 4

},

lista:{
  backgroundColor: '#fff'
},

barraBusqueda:{

width: '100%',
height: 40,
flexDirection: 'row',

},

iconoMenu:{
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center' ,
  backgroundColor: '#34c1bb'

},

iconLupa:{
  alignItems: 'center',
  justifyContent: 'center',
  top: 4,
  paddingHorizontal: 2,
},


inputBusqueda2:{
 width: '100%',
  paddingLeft: 4,
  color: 'gray',
  flex: 1,
  height: 45,
  fontSize: 17

},

});

