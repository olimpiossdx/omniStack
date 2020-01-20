import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';


const Main = ({ navigation }) => {

  const [currentReagion, setCurrentReagion] = React.useState(null);

  React.useEffect(() => {
    async function loadInitialLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({ enableHighAccuracy: true });
        const { longitude, latitude } = coords;

        setCurrentReagion({
          longitude,
          latitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadInitialLocation();

  }, []);

  if (!currentReagion) {
    return null;
  }

  return (<>
    <MapView initialRegion={currentReagion} style={style.map} >
      <Marker coordinate={{ longitude: -44.0149604, latitude: -19.8716562 }} >
        <Image style={style.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/30667729?s=400&v=4' }} />
        <Callout onPress={() => { navigation.navigate('Profile', { github_username: 'diego3g' }) }}>
          <View style={style.callout}>
            <Text style={style.devName}> Olimpio Pimenta</Text>
            <Text style={style.devBio}> Egenheiro de Computação com foco em desenvolvimento</Text>
            <Text style={style.devTechs}> React native,typescritp,reactJS,c#</Text>
          </View>
        </Callout>
      </Marker>
    </MapView >
    <View style={StyleSheet.searchForm}>
      <TextInput
        style={style.searchInput}
        placeholder="Buscar devs por techs..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false} />
      <TouchableOpacity onPress={() => { }} style={StyleSheet.loadButton}>
        <MaterialIcons name="my-location" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  </>);
}

const style = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    right: 50,
    backgroundColor: "#FFF",
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  }

})

export default Main;