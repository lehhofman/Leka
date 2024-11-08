import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';  
import { MaterialIcons } from '@expo/vector-icons'; 

const CommunityScreen = ({ navigation }) => { 
  const [modalVisible, setModalVisible] = useState(false);
  const [acceptedFriendsModalVisible, setAcceptedFriendsModalVisible] = useState(false); 
  const [friendId, setFriendId] = useState('');
  const [friends, setFriends] = useState([]);
  const [invites, setInvites] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const currentUserString = await AsyncStorage.getItem('currentUser');
      const user = currentUserString ? JSON.parse(currentUserString) : null;
      setCurrentUser(user);

      if (user) {
        const invitesString = await AsyncStorage.getItem('invites');
        const storedInvites = invitesString ? JSON.parse(invitesString) : [];
        setInvites(storedInvites.filter(invite => invite.inviteTo === user.id));

        const acceptedFriendsString = await AsyncStorage.getItem('acceptedFriends');
        const storedAcceptedFriends = acceptedFriendsString ? JSON.parse(acceptedFriendsString) : [];
        setAcceptedFriends(storedAcceptedFriends.filter(friend =>
          friend.userId === user.id || friend.friendId === user.id
        ));

        const usersString = await AsyncStorage.getItem('users');
        const users = usersString ? JSON.parse(usersString) : [];
        setFriends(users);
      }
    };
    loadData();
  }, []);

  const addFriend = async () => {
    if (friendId.trim() !== '') {
      try {
        const usersString = await AsyncStorage.getItem('users');
        const users = usersString ? JSON.parse(usersString) : [];
        const friend = users.find((user) => user.id === friendId);

        if (friend) {
          sendInvite(friend);
        } else {
          Alert.alert('Erro', 'ID de amigo não encontrado.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar o amigo.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira o ID do amigo.');
    }
  };

  const sendInvite = async (friend) => {
    if (currentUser) {
      try {
        const newInvite = {
          id: Date.now().toString(),
          inviteFrom: currentUser.id,
          inviteTo: friend.id,
          status: 'pendente',
          nome: friend.nome,
        };

        const updatedInvites = [...invites, newInvite];
        setInvites(updatedInvites);
        await AsyncStorage.setItem('invites', JSON.stringify(updatedInvites));

        Alert.alert('Convite Enviado', `Convite enviado para ${friend.nome}`);
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao enviar o convite.');
      }
    }
  };

  const acceptInvite = async (invite) => {
    try {
      const friendName = friends.find(friend => friend.id === invite.inviteFrom)?.nome || 'Amigo';

      const newAcceptedFriend = {
        id: Date.now().toString(),
        userId: currentUser.id,
        friendId: invite.inviteFrom,
        nome: friendName,
      };

      const newAcceptedForSender = {
        id: Date.now().toString(),
        userId: invite.inviteFrom,
        friendId: currentUser.id,
        nome: currentUser.nome,
      };

      const updatedAcceptedFriends = [
        ...acceptedFriends,
        newAcceptedFriend,
        newAcceptedForSender,
      ];

      const uniqueAcceptedFriends = updatedAcceptedFriends.filter((friend, index, self) =>
        index === self.findIndex((f) =>
          (f.userId === friend.userId && f.friendId === friend.friendId) ||
          (f.userId === friend.friendId && f.friendId === friend.userId)
        )
      );

      setAcceptedFriends(uniqueAcceptedFriends);

      const updatedInvites = invites.filter((item) => item.id !== invite.id);
      setInvites(updatedInvites);

      await AsyncStorage.setItem('acceptedFriends', JSON.stringify(uniqueAcceptedFriends));
      await AsyncStorage.setItem('invites', JSON.stringify(updatedInvites));

    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao aceitar o convite.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Criar Comunidade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Adicionar Amigos</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Comunidade de Amigos</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="ID do amigo"
              placeholderTextColor="#999"
              value={friendId}
              onChangeText={setFriendId}
            />
            <TouchableOpacity style={styles.searchButton} onPress={addFriend}>
              <Text style={styles.searchButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Convites Recebidos</Text>
          <FlatList
            data={invites}
            keyExtractor={(item) => `${item.inviteFrom}-${item.inviteTo}`} 
            renderItem={({ item }) => (
              <View style={styles.inviteItem}>
                <Text style={styles.inviteText}>
                  {item.inviteFrom === currentUser.id
                    ? `Você convidou ${friends.find(friend => friend.id === item.inviteTo)?.nome || 'alguém'}. Status: ${item.status}`
                    : `${friends.find(friend => friend.id === item.inviteFrom)?.nome || 'Alguém'} te enviou um convite. Status: ${item.status}`}
                </Text>
                {item.inviteFrom !== currentUser.id && item.status === 'pendente' && (
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => acceptInvite(item)}
                  >
                    <Text style={styles.acceptButtonText}>Aceitar</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            style={styles.list}
          />
        </View>
      </Modal>

      <TouchableOpacity 
        style={styles.acceptedFriendsButton}
        onPress={() => setAcceptedFriendsModalVisible(true)}
      >
        <FontAwesome name="user" size={24} color="#4d1948" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={acceptedFriendsModalVisible}
        onRequestClose={() => setAcceptedFriendsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setAcceptedFriendsModalVisible(false)}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Amigos</Text>

          <FlatList
            data={acceptedFriends}
            keyExtractor={(item) => `${item.userId}-${item.friendId}`} 
            renderItem={({ item }) => {
              const friendName = friends.find(friend => friend.id === (item.userId === currentUser.id ? item.friendId : item.userId))?.nome || 'Amigo';
              return (
                <View style={styles.listItem}>
                  <Image source={require('./assets/logo.png')} style={styles.profileImage} />
                  <Text style={styles.listItemText}>
                    {friendName}
                  </Text>
                </View>
              );
            }}
            style={styles.list}
          />
        </View>
      </Modal>

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
  },
  buttonContainer: {
    position: 'absolute',
    top: 50,
    left: 15, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '80%', 
  },
  addButton: {
    backgroundColor: '#f7e1c9',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginRight: 10, 
  },
  buttonText: {
    color: '#4d1948',
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptedFriendsButton: {
    position: 'absolute',
    bottom: 90,
    right: 10,
    backgroundColor: '#f7e1c9',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)', 
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignSelf: 'center',
    marginTop: 100,
    height: '50%',
    borderWidth: 1,
    borderColor: '#f7e1c9',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  closeText: {
    color: '#b03892',
    fontSize: 30,
  },
  title: {
    color: '#f7e1c9',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    color: '#f7e1c9',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#444',
    color: '#f7e1c9',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#b03892',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 15,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  inviteItem: {
    padding: 12,
    backgroundColor: '#444',
    marginBottom: 10,
    borderRadius: 8,
  },
  inviteText: {
    color: '#f7e1c9',
  },
  acceptButton: {
    backgroundColor: '#4d1948',
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  list: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#444',
    marginBottom: 10,
    borderRadius: 8,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 12,
    marginRight: 10,
  },
  listItemText: {
    color: '#f7e1c9',
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

export default CommunityScreen;
