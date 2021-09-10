import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
 import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  image: {
    width: 320,

  },

    image2: {
    height: 320,

  },

  text: {
    color: 'rgba(34, 34, 34, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
 
const slides = [
    {
    key: 'www.mako.guru',
    title: 'www.mako.guru',
    text: 'A continuación te contamos alguna características de MAKO\n DESLIZAR ->',
    image: require('./imgs/logomako2.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#fff',
  },

  {
    key: 'Toda Boyacá',
    title: 'Toda Boyacá',
    text: 'Buscamos ser el directorio más grande y usado por la comunidad Boyacense',
    image: require('./imgs/slides/001.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#8BC34A',
  },


  {
    key: 'Datos básicos',
    title: 'Datos de contacto',
    text: 'Podrás registrar: teléfonos, productos, e-mails, página web y horarios de atención.',
    image: require('./imgs/slides/002.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#F1C40F',
  },


  {
    key: 'local app',
    title: 'Tu negocio en la app',
    text: 'Así te verán tus clientes en nuestra app movil',
    image: require('./imgs/slides/003.png'),
    imageStyle: styles.image,
    backgroundColor: '#9C27B0',
  },

  {
    key: 'local pagina',
    title: 'Tu negocio en la Web',
    text: 'Así te verán tus clientes en nuestra pagina web',
    image: require('./imgs/slides/004.png'),
    imageStyle: styles.image2,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#F44336',
  },

  {
    key: 'botones',
    title: 'Botones de acción',
    text: 'Botones de acción inmediata para llamadas, whatsapp, e-mails y visitar tu web o facebook',
    image: require('./imgs/slides/005.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#FF5722',
  },

  {
    key: 'búsquedas',
    title: 'Búsquedas inteligentes',
    text: 'Opción de búsquedas por nombre, categorías, productos o servicios y palabras claves',
    image: require('./imgs/slides/006.png'),
    imageStyle: styles.image2,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#4CAF50',
  },

  {
    key: 'apps',
    title: 'Apps en las 2 plataformas',
    text: 'Contamos con apps en las 2 plataformas mas usadas, junto con nuestra pagina web',
    image: require('./imgs/slides/007.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#FFCA28',
  },

  {
    key: 'emergencia',
    title: 'Números de emergencia',
    text: 'Podrás encontrar números de emergencia como lo son, policía, bomberos cruz rojas, etc.',
    image: require('./imgs/slides/008.png'),
    imageStyle: styles.image2,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#EC407A',
  },

  {
    key: 'offline',
    title: 'Directorio offline',
    text: 'Directorio básico sin internet. para que los usuarios nunca se queden sin la información relevante de contacto',
    image: require('./imgs/slides/009.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#9575CD',
  },

  {
    key: 'economico',
    title: 'Registro economico',
    text: 'para poder brindar la posibilidad a cualquier comerciante de tener presencia en la web y que los usuarios encuentren toda la información comercial de Boyacá',
    image: require('./imgs/slides/010.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: styles.text,
    backgroundColor: '#00BECA',
  },

  {
    key: 'esperas',
    title: 'Eres comerciante \n registrarte ya !',
    text: 'No lo dejes pasar',
    image: require('./imgs/slides/011.png'),
    imageStyle: styles.image2,
    titleStyle: styles.text,
    backgroundColor: '#EC407A',
  },

];
 
export default class App extends React.Component {
  _onDone = () => {
    Actions.pop();
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        style={{width: '100%'}}/>
    );
  }
}