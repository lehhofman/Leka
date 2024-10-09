import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-Vindo de Volta!</Text>
            <Button
                title="ENTRAR COM E-MAIL"
                color="#6C63FF"
                onPress={() => navigation.navigate('Motivo')}
            />
            <Button
                title="Não tenho uma conta? Cadastrar"
                color="#000"
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 10,
        height: 10,
        marginBottom: 20,
      },
    title: {
        fontSize: 28,
        color: '#fff',
        marginBottom: 40,
    },
});

export default LoginScreen;
