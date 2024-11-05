import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({ nome: '', email: '', celular: '' });
  const [profileImage, setProfileImage] = useState('https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg');
  const [isModalVisible, setModalVisible] = useState(false);

  const profileImages = [
    'https://img.freepik.com/vetores-premium/uma-ilustracao-de-desenho-animado-de-uma-menina-com-fones-de-ouvido-e-um-telefone-celular-na-mao_569725-49415.jpg?semt=ais_hybrid',
    'https://img.freepik.com/vetores-premium/jogador-de-desenhos-animados-feliz-segurando-um-joystick-com-um-grande-sorriso_657438-25584.jpg',
    'https://cdn-icons-png.flaticon.com/512/1752/1752713.png',
    'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-avatar-ninja-symbol-icon-vector-png-image_6709524.png',
    'https://cdn-icons-png.flaticon.com/512/1752/1752767.png',
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserString = await AsyncStorage.getItem('currentUser');
        if (currentUserString) {
          setUser(JSON.parse(currentUserString));
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário logado:', error);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.error('Erro ao carregar a imagem de perfil:', error);
      }
    };

    fetchUserData();
    fetchProfileImage();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const selectImage = async (uri) => {
    try {
      await AsyncStorage.setItem('profileImage', uri);
      setProfileImage(uri);
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar a imagem de perfil:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={openModal}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{user.nome}</Text>
      <Text style={styles.contactInfo}>{user.email} | {user.celular}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Progressos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Certificados</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Records</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>ALTERAR PERFIL</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma imagem</Text>
            <FlatList
              data={profileImages}
              keyExtractor={(item) => item}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectImage(item)}>
                  <Image source={{ uri: item }} style={styles.modalImage} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game')}>
          <MaterialIcons name="games" size={30} color="#4d1948" />
          <Text style={styles.menuText}>Jogo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Resumo')}>
          <MaterialIcons name="description" size={30} color="#4d1948" />
          <Text style={styles.menuText}>Resumo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Amigos')}>
          <MaterialIcons name="group" size={30} color="#4d1948" />
          <Text style={styles.menuText}>Amigos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}>
          <MaterialIcons name="person" size={30} color="#4d1948" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60, 
  },
  profileImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 300,
    backgroundColor: '#7d5ba6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  name: {
    fontSize: 22,
    color: '#f7e1c9',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#f7e1c9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: '#4d1948',
  },
  buttonText: {
    color: '#4d1948',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#a469aa',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f7e1c9',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: '#4d1948',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalImage: {
    width: 90,
    height: 90,
    borderRadius: 90,
    marginHorizontal: 10,
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#a469aa',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f7e1c9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: '#4d1948',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ProfileScreen;
