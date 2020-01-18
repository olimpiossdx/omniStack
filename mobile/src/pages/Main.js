import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';


const Main = () => {

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

    return (<MapView initialRegion={currentReagion} style={style.map} >
        <Marker coordinate={{ longitude: -44.0149604, latitude: -19.8716562 }} >
            <Image style={style.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/30667729?s=400&v=4' }} />
            <Callout onPress={() => { }}>
                <View style={style.callout}>
                    <Text style={style.devName}> Olimpio Pimenta</Text>
                    <Text style={style.devBio}> Egenheiro de Computação com foco em desenvolvimento</Text>
                    <Text style={style.devTechs}> React native,typescritp,reactJS,c#</Text>
                </View>
            </Callout>
        </Marker>
    </MapView>);
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
    }
})

export default Main;