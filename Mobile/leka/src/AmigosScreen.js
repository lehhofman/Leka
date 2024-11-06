// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CommunityScreen = () => {
//   const [friendId, setFriendId] = useState('');
//   const [friends, setFriends] = useState([]);
//   const [invites, setInvites] = useState([]);
//   const [acceptedFriends, setAcceptedFriends] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       const currentUserString = await AsyncStorage.getItem('currentUser');
//       const user = currentUserString ? JSON.parse(currentUserString) : null;
//       setCurrentUser(user);
  
//       if (user) {
//         // Carregar convites para o usuário atual
//         const invitesString = await AsyncStorage.getItem('invites');
//         const storedInvites = invitesString ? JSON.parse(invitesString) : [];
//         setInvites(storedInvites.filter(invite => invite.inviteTo === user.id));  // Filtrar convites recebidos para o usuário atual
  
//         // Carregar amigos aceitos
//         const acceptedFriendsString = await AsyncStorage.getItem('acceptedFriends');
//         const storedAcceptedFriends = acceptedFriendsString ? JSON.parse(acceptedFriendsString) : [];
//         setAcceptedFriends(storedAcceptedFriends.filter(friend => friend.userId === user.id));  // Filtrar amigos do usuário atual
  
//         // Carregar todos os amigos para exibir na lista de convites
//         const usersString = await AsyncStorage.getItem('users');
//         const users = usersString ? JSON.parse(usersString) : [];
//         setFriends(users); // Atualizar a lista de amigos
//       }
//     };
//     loadData();
//   }, []);
  

//   const addFriend = async () => {
//     if (friendId.trim() !== '') {
//       try {
//         const usersString = await AsyncStorage.getItem('users');
//         const users = usersString ? JSON.parse(usersString) : [];
//         const friend = users.find((user) => user.id === friendId);

//         if (friend) {
//           // Adicionar o convite para o amigo
//           sendInvite(friend);
//         } else {
//           Alert.alert('Erro', 'ID de amigo não encontrado.');
//         }
//       } catch (error) {
//         Alert.alert('Erro', 'Ocorreu um erro ao buscar o amigo.');
//       }
//     } else {
//       Alert.alert('Erro', 'Por favor, insira o ID do amigo.');
//     }
//   };

//   const sendInvite = async (friend) => {
//     if (currentUser) {
//       try {
//         const newInvite = {
//           id: Date.now().toString(),
//           inviteFrom: currentUser.id,
//           inviteTo: friend.id,
//           status: 'pendente', // Status do convite (pendente por padrão)
//           nome: friend.nome,
//         };

//         // Adicionar o convite à lista de convites
//         const updatedInvites = [...invites, newInvite];
//         setInvites(updatedInvites);
//         await AsyncStorage.setItem('invites', JSON.stringify(updatedInvites));

//         // Enviar uma mensagem para o convidado
//         Alert.alert('Convite Enviado', `Convite enviado para ${friend.nome}`);
//       } catch (error) {
//         Alert.alert('Erro', 'Ocorreu um erro ao enviar o convite.');
//       }
//     }
//   };

//   const acceptInvite = async (invite) => {
//     try {
//       const updatedAcceptedFriends = [...acceptedFriends, { ...invite, status: 'aceito' }];
//       setAcceptedFriends(updatedAcceptedFriends);

//       // Remover convite da lista de convites
//       const updatedInvites = invites.filter((item) => item.id !== invite.id);
//       setInvites(updatedInvites);

//       // Salvar listas atualizadas no AsyncStorage
//       await AsyncStorage.setItem('acceptedFriends', JSON.stringify(updatedAcceptedFriends));
//       await AsyncStorage.setItem('invites', JSON.stringify(updatedInvites));

//       Alert.alert('Amigo Aceito', `Você agora é amigo de ${invite.nome}`);
//     } catch (error) {
//       Alert.alert('Erro', 'Ocorreu um erro ao aceitar o convite.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Comunidade de Amigos</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="ID do amigo"
//         placeholderTextColor="#999"
//         value={friendId}
//         onChangeText={setFriendId}
//       />
//       <TouchableOpacity style={styles.button} onPress={addFriend}>
//         <Text style={styles.buttonText}>Buscar Amigo</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={friends}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.listItem}>
//             <Image source={require('./assets/logo.png')} style={styles.profileImage} />
//             <Text style={styles.listItemText}>{item.nome} (ID: {item.id})</Text>
//             <TouchableOpacity style={styles.addButton} onPress={() => sendInvite(item)}>
//               <Text style={styles.addButtonText}>Adicionar</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         style={styles.list}
//       />

//       <Text style={styles.subtitle}>Convites Recebidos</Text>
//       <FlatList
//   data={invites}
//   keyExtractor={(item) => item.id}
//   renderItem={({ item }) => {
//     const convidante = friends.find(friend => friend.id === item.inviteFrom); // Busca o convidante pela ID
//     const convidado = friends.find(friend => friend.id === item.inviteTo); // Busca o convidado pela ID

//     return (
//       <View style={styles.inviteItem}>
//         <Text style={styles.inviteText}>
//           {item.inviteFrom === currentUser.id
//             ? `Você convidou ${convidado ? convidado.nome : 'alguém'} para ser seu amigo. Status: ${item.status}`
//             : `${convidante ? convidante.nome : 'Alguém'} te enviou uma solicitação de amizade. Status: ${item.status}`}
//         </Text>
//         {item.inviteFrom !== currentUser.id && item.status === 'pendente' && (
//           <TouchableOpacity
//             style={styles.acceptButton}
//             onPress={() => acceptInvite(item)}
//           >
//             <Text style={styles.acceptButtonText}>Aceitar</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     );
//   }}
//   style={styles.list}
// />


//       <Text style={styles.subtitle}>Amigos Aceitos</Text>
//       <FlatList
//         data={acceptedFriends}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.listItem}>
//             <Image source={require('./assets/logo.png')} style={styles.profileImage} />
//             <Text style={styles.listItemText}>{item.nome} (ID: {item.id})</Text>
//           </View>
//         )}
//         style={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#333',
//   },
//   title: {
//     color: '#f7e1c9',
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   subtitle: {
//     color: '#f7e1c9',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor: '#444',
//     color: '#f7e1c9',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#4d1948',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#f7e1c9',
//     fontSize: 16,
//   },
//   listItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   inviteItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   inviteText: {
//     color: '#f7e1c9',
//     fontSize: 16,
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   listItemText: {
//     color: '#f7e1c9',
//     fontSize: 16,
//   },
//   addButton: {
//     backgroundColor: '#4d1948',
//     padding: 6,
//     borderRadius: 5,
//   },
//   addButtonText: {
//     color: '#f7e1c9',
//     fontSize: 14,
//   },
//   acceptButton: {
//     backgroundColor: '#4d1948',
//     padding: 6,
//     borderRadius: 5,
//   },
//   acceptButtonText: {
//     color: '#f7e1c9',
//     fontSize: 14,
//   },
// });

// export default CommunityScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommunityScreen = () => {
  const [friendId, setFriendId] = useState('');
  const [invites, setInvites] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');
  const [messageModalVisible, setMessageModalVisible] = useState(false);

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
        setAcceptedFriends(storedAcceptedFriends.filter(friend => friend.userId === user.id));
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

        // Mensagem para o usuário atual (A)
        const currentUserMessage = `Você convidou ${friend.nome} para ser seu amigo.`;

        // Mensagem para o amigo (B)
        const friendMessage = `${currentUser.nome} enviou um convite de amizade.`;

        // Armazenando mensagens separadas para cada usuário
        const currentUserMessagesString = await AsyncStorage.getItem('messages');
        const currentUserMessages = currentUserMessagesString ? JSON.parse(currentUserMessagesString) : [];
        currentUserMessages.push({ userId: currentUser.id, message: currentUserMessage });
        await AsyncStorage.setItem('messages', JSON.stringify(currentUserMessages));

        const friendMessagesString = await AsyncStorage.getItem('messages');
        const friendMessages = friendMessagesString ? JSON.parse(friendMessagesString) : [];
        friendMessages.push({ userId: friend.id, message: friendMessage });
        await AsyncStorage.setItem('messages', JSON.stringify(friendMessages));

        setInviteMessage(currentUserMessage); // Exibe a mensagem para o usuário atual
        setModalVisible(false); // Fecha o modal de convite
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao enviar o convite.');
      }
    }
  };

  const acceptInvite = async (invite) => {
    try {
      const updatedAcceptedFriends = [...acceptedFriends, { ...invite, status: 'aceito' }];
      setAcceptedFriends(updatedAcceptedFriends);

      const updatedInvites = invites.filter((item) => item.id !== invite.id);
      setInvites(updatedInvites);

      await AsyncStorage.setItem('acceptedFriends', JSON.stringify(updatedAcceptedFriends));
      await AsyncStorage.setItem('invites', JSON.stringify(updatedInvites));

      Alert.alert('Amigo Aceito', `Você agora é amigo de ${invite.nome}`);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao aceitar o convite.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunidade de Amigos</Text>

      <TouchableOpacity
        style={styles.friendsButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.friendsButtonText}>Buscar Amigos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.messagesButton}
        onPress={() => setMessageModalVisible(true)}
      >
        <Text style={styles.messagesButtonText}>Mensagens</Text>
      </TouchableOpacity>

      {/* Modal for Friends */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="ID do amigo"
              value={friendId}
              onChangeText={setFriendId}
            />
            <TouchableOpacity style={styles.button} onPress={addFriend}>
              <Text style={styles.buttonText}>Buscar Amigo</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>Amigos Aceitos</Text>
            <FlatList
              data={acceptedFriends}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Image source={require('./assets/logo.png')} style={styles.profileImage} />
                  <Text style={styles.listItemText}>{item.nome} (ID: {item.id})</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal for Invite Message */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={inviteMessage !== ''}
        onRequestClose={() => setInviteMessage('')}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalMessageContainer}>
            <Text style={styles.messageText}>{inviteMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setInviteMessage('')}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Messages */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={messageModalVisible}
        onRequestClose={() => setMessageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMessageModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>Mensagens de Convites</Text>
            <FlatList
              data={invites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.listItemText}>Convite de: {item.nome}</Text>
                  <TouchableOpacity style={styles.acceptButton} onPress={() => acceptInvite(item)}>
                    <Text style={styles.acceptButtonText}>Aceitar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  friendsButton: {
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  friendsButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  messagesButton: {
    backgroundColor: '#ffaa00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  messagesButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalMessageContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  acceptButton: {
    backgroundColor: '#00aaff',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CommunityScreen;
