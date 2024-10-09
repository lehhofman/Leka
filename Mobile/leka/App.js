import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import MotivoScreen from './src/MotivoScreen';
import MelhorOpcaoScreen from './src/MelhorOpcaoScreen';
import ExperienciaScreen from './src/ExperienciaScreen';
import AspectoScreen from './src/AspectoScreen';
import InteressanteScreen from './src/InteressanteScreen';
import ResultadoScreen from './src/ResultadoScreen';
import WelcomeScreen from './src/WelcomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="bemvindo">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Motivo" component={MotivoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MelhorOpcao" component={MelhorOpcaoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Experiencia" component={ExperienciaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Aspecto" component={AspectoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Interessante" component={InteressanteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Resultado" component={ResultadoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="bemvindo" component={WelcomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;