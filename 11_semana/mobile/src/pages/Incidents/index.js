import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

const Incidents = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Tex style={styles.headerText}>
          Total de <Tex style={styles.headerTextBold}>0 casos</Tex>.
        </Tex>
      </View>
      <Tex style={styles.title}> Bem-vindo!</Tex>
      <Tex style={styles.description}> Escolha um dos casos baixo e salve o dia.</Tex>

      <View style={styles.incidentList}>
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>APAD</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>Cadelinha atropelada</Text>


          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}> R$ 120,00 </Text>
          <TouchableOpacity style={styles.detailsButton} onPress={() => { }}>
            <Feather name='arrow-right' size={16} color='#E02041'/>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.incidentList}>
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>APAD</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>Cadelinha atropelada</Text>


          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}> R$ 120,00 </Text>
          <TouchableOpacity style={styles.detailsButton} onPress={() => { }}>
            <Feather name='arrow-right' size={16} color='#E02041'/>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.incidentList}>
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>APAD</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>Cadelinha atropelada</Text>


          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}> R$ 120,00 </Text>
          <TouchableOpacity style={styles.detailsButton} onPress={() => { }}>
            <Feather name='arrow-right' size={16} color='#E02041'/>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.incidentList}>
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>APAD</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>Cadelinha atropelada</Text>


          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}> R$ 120,00 </Text>
          <TouchableOpacity style={styles.detailsButton} onPress={() => { }}>
            <Feather name='arrow-right' size={16} color='#E02041'/>
          </TouchableOpacity>
        </View>
      </View>



    </View>
  )
}

export default Incidents;
