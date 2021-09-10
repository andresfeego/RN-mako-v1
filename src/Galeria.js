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
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Gallery from 'react-native-image-gallery';
import {Actions} from 'react-native-router-flux';

export default class Galeria extends Component<{}> {

  constructor (props) {
        super(props);
        this.state = {
            index: this.props.index,
            images: this.props.imagenes,
                
        };
        this.onChangeImage = this.onChangeImage.bind(this);

    }

 renderError () {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                 <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>Imposible mostrar la imagen en el momento</Text>
                 <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>... intenta de nuevo mas tarde :)</Text>
            </View>
        );
    }

    onChangeImage (index) {
        this.setState({ index });
    }  

    get galleryCount () {
        const { index, images } = this.state;
        return (
            <View style={{ top: 0,right: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '50%', position: 'absolute', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'right', color: 'white', fontSize: 15, fontStyle: 'italic', paddingRight: '10%' }}>{ index + 1 } / { images.length }</Text>
            </View>
        );
    }

       get caption () {
        const { images, index } = this.state;
        return (
            <View style={{ bottom: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontStyle: 'italic' }}>{ (images[index] && images[index].caption) || '' } </Text>
            </View>
        );
    }

  get close () {
        const { images, index } = this.state;
        return (
            <TouchableOpacity onPress={() => Actions.pop()} style={{ top: 0,left: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '50%', position: 'absolute', justifyContent: 'center',alignItems: 'flex-start', paddingHorizontal: 15 }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontStyle: 'italic' }}> X Cerrar </Text>
            </TouchableOpacity>
        );
    }

  render() {
    return (
    <View style={{ flex: 1 }} >
                <Gallery
                  style={{flex: 1, backgroundColor: '#696969'}}
                  images={this.props.imagenes}
                  errorComponent={this.renderError}
                  onPageSelected={this.onChangeImage}
                  initialPage={this.props.index}/>
                { this.galleryCount }
                { this.caption }
                { this.close }
            </View>
    );
  }
}

