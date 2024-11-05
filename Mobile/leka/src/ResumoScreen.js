import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SummaryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo</Text>
      <Text style={styles.content}>Aqui está o resumo do seu progresso e estatísticas.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  title: {
    color: '#f7e1c9',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4d1948',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#f7e1c9',
    fontSize: 16,
  },
});

export default SummaryScreen;
