import React, {Component} from 'react'

import {
	Text,
	View,
	Image,
	Dimensions,
	StyleSheet
} from 'react-native'

import Swiper from 'react-native-swiper'
import Slider from './Slider.js'



const {width}= Dimensions.get('window')



export default class extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	imageSlider : []
	  };
	  this.getSlides();
	}




getSlides(){
   

    return fetch('http://www.mako.guru/listadosApp/returnSlides.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      ciudad: '',
    
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         //console.warn('antes', responseJson);
         
          if (responseJson != 0) {
            data=[];
            data= responseJson;
            this.setState({
              imageSlider: data,
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



	render(){
		return(
			<View style={styles2.cont}>
			<Swiper
			autoplay
			paginationStyle={{top: -180}}
			autoplayTimeout={6}
			activeDot={<View style={{backgroundColor: '#f33446', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
			>
		{
					this.state.imageSlider.map((item,i) => <Slider
						uri={item.img}
						key={i}
						titulo={item.titulo} 
						idCat={item.idCat}
						tipoLink={item.tipoLink}
						codigo={item.codigo_empresa}
						lblCat={item.lblCat}
						appFun={this.props.appFun}/>)
				}
			</Swiper>


			<View style={[this.props.style,styles2.triangulo,styles2.triangleCornerBottomLeft]}>

			</View>
			          <Image style={styles2.logoMako} source={require('./imgs/logomako1.png')}/>
			</View>
		)
	}
}

const styles2 = StyleSheet.create({
cont:{
	width: '100%',
	height: 250,
	zIndex: 100,
},

container:{

},

image:{
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
 },

 triangulo:{
 	width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 200,
    borderBottomWidth: 100,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    
},

  triangleCornerBottom4Left: {
    transform: [
      {rotate: '270deg'}
    ]
  },

  logoMako:{
    width: 40,
    height: 40,
    resizeMode: Image.resizeMode.contain,
    position: 'absolute',
    bottom: 4,
    left: 12,
    zIndex: 50
  },
txt:{
	color: '#000',
	position: 'absolute',
	bottom: 30,
	right: 5,
	width: '48%',
	height: 80,
	backgroundColor: 'rgba(57,66,95,0.5)',
	borderTopRightRadius: 10,
	borderTopLeftRadius: 50,
	textAlign: 'center',
	textAlignVertical: 'center' ,
},

txt1:{
	color: '#fff',
	position: 'absolute',
	bottom: 10,
	right: 5,
	width: '48%',
	height: 20,
	backgroundColor: 'rgb(57,66,95)',
	borderBottomLeftRadius: 10,
	borderBottomRightRadius: 10,
	textAlign: 'center',
	textAlignVertical: 'center' ,
},

})