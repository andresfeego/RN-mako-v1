/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,View,Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import ListEmpresas from './ListEmpresas.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetalleVenta from './DetalleVenta.js'
//import {Actions} from 'react-native-router-flux';


export default class CategoriasP extends Component {
  






  render() {

    return (
<ScrollView horizontal>
	<View style={styles.container}>

	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(299, 'Asesor MAKO')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/mako.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Asesor MAKO</Text>
	   	</TouchableOpacity>

	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(19, 'Domicilios     p-a-p')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/pap.png')}/>
	        </View>
	        <Text style={[styles.catego]}>Domicilios     p-a-p</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(1, 'Taxis')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/taxis.png')}/>
	        </View>
	        <Text style={[styles.catego]}>Taxis</Text>
	   	</TouchableOpacity>	

	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(301, 'Alquiler de lavadoras')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/lavadoras.png')}/>
	        </View>
	        <Text style={[styles.catego]}>Alquiler de lavadoras</Text>
	   	</TouchableOpacity>	

	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(127, ' Cerrajeros')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/cerrajeros.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Cerrajeros</Text>
	   	</TouchableOpacity>	  

	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(3, ' Acarreos')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/acarreos.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Acarreos</Text>
	   	</TouchableOpacity>


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(30, ' Asaderos')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/asaderos.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Asaderos</Text>
	   	</TouchableOpacity>

	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(102, ' Bares')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/bares.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Bares</Text>
	   	</TouchableOpacity>


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(31, ' Cafeterías')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/cafeterias.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Cafeterías</Text>
	   	</TouchableOpacity>


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(28, ' Comida china')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/china.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Comida china</Text>
	   	</TouchableOpacity>	  


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(26, ' Comidas rápidas')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/rapida.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Comidas rápidas</Text>
	   	</TouchableOpacity>	
	   	

	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(53, ' Detalles y regalos')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/detalles.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Detalles y regalos</Text>
	   	</TouchableOpacity>


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(24, ' Restaurante ejectivo')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/ejecutivo.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Restaurante ejectivo</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(167, ' Funerarias')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/funerarias.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Funerarias</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(36, ' Heladerías')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/heladerias.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Heladerías</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(43, ' Licoreras')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/licoreras.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Licoreras</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(151, ' Mariachis')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/mariachis.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Mariachis</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(22, ' Parqueaderos')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/parqueaderos.png')}/>
	        </View>
	        <Text style={[styles.catego]}> Parqueaderos</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(41, 'Pastelerías')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/pastelerias.png')}/>
	        </View>
	        <Text style={[styles.catego]}>Pastelerías</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(109, 'Piscinas')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/piscinas.png')}/>
	        </View>
	        <Text style={[styles.catego]}>Piscinas</Text>
	   	</TouchableOpacity>	




	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(256, 'Droguerías')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/drogas.png')}/>
	        </View>
	        <Text style={[styles.catego]}>Droguerías</Text>
	   	</TouchableOpacity>	


	   	<TouchableOpacity style={styles.touch} onPress={()=> this.props.appFun.cambiaCategoria(205, 'Veterinarias')} > 
	    	<View style={styles.circulo}>
                <Image style={[styles.icono]} source={require('./iconos/veterinarias.png')}/>
	        </View>
	        <Text style={[styles.catego]}>Veterinarias</Text>
	   	</TouchableOpacity>	

    	<TouchableOpacity style={[styles.touch,{}]} onPress={()=> this.props.appFun.llenaCat(7,0,0)} > 
	    	<View style={[styles.circulo, {backgroundColor: 'lightgray'}]}>
            <Icon name="toc" size={30} color={'#f33446'} style={styles.footerIcon}/>
	        </View>
	        <Text style={[styles.catego]}> Todas las categorías</Text>
	   	</TouchableOpacity>

	   	   	

	</View>
</ScrollView>
    	)
   
  }
}

const styles = StyleSheet.create({

container:{
  height: 87,
  flexDirection: 'row' ,
  flexWrap: 'nowrap' ,
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
  backgroundColor: '#34c1bb',
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center', 
},

catego:{
  color: '#242B40',
  fontSize: 10,
  textAlign: 'center',
},

icono:{
width: 30,
resizeMode: Image.resizeMode.contain,

},
footerIcon:{

},
});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */