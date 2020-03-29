import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

const Incidents = () => {
  const navigation = useNavigation();
  const [incidents, setincidents] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);


  const navigateToDetails = (incident) => {
    navigation.navigate('Detail', { incident });
  }

  const loadIncidents = async () => {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page }
    });
    setincidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);

    setPage(page + 1);
    setLoading(false);
  };

  React.useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}> Bem-vindo!</Text>
      <Text style={styles.description}> Escolha um dos casos baixo e salve o dia.</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={true}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>


            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetails(incident)} >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name='arrow-right' size={16} color='#E02041' />
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  )
}

export default Incidents;
