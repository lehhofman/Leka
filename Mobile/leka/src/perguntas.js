import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

// Importar o JSON para o conteúdo
const learningPathData = {
  "learningPath": {
    "title": "Frontend Básico - Trilha de Aprendizagem",
    "description": "Uma trilha de aprendizagem para iniciantes em frontend, cobrindo HTML, CSS e JavaScript básicos.",
    "modules": [
      {
        "id": 1,
        "title": "Introdução ao HTML",
        "description": "Aprenda o que é HTML e como estruturar uma página web.",
        "interactiveContent": [
          {
            "step": 1,
            "instruction": "Digite o código HTML básico para criar uma página com título 'Meu Primeiro Site'.",
            "exampleCode": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Meu Primeiro Site</title>\n  </head>\n  <body>\n  </body>\n</html>",
            "hint": "Use <html>, <head> e <title> para começar a estruturar a página.",
            "userResponse": "code"
          },
          {
            "step": 2,
            "instruction": "Adicione um cabeçalho (h1) com o texto 'Bem-vindo ao meu site!' dentro do <body>.",
            "exampleCode": "<body>\n  <h1>Bem-vindo ao meu site!</h1>\n</body>",
            "hint": "Use a tag <h1> para criar o cabeçalho.",
            "userResponse": "code"
          }
        ]
      },
      // ... outros módulos
    ]
  }
};

function LearningPath() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const currentModule = learningPathData.learningPath.modules[currentModuleIndex];

  const handleNext = () => {
    if (currentModuleIndex < learningPathData.learningPath.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    } else {
      Alert.alert("Parabéns!", "Você completou a trilha!");
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{learningPathData.learningPath.title}</Text>
      <Text style={{ marginVertical: 10 }}>{learningPathData.learningPath.description}</Text>
      {currentModule ? (
        <Module
          module={currentModule}
          onNext={handleNext}
        />
      ) : (
        <Quiz quiz={learningPathData.learningPath.modules[4]?.quiz || []} />
      )}
    </View>
  );
}

function Module({ module, onNext }) {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>{module.title}</Text>
      <Text style={{ marginVertical: 10 }}>{module.description}</Text>
      {module.interactiveContent.map((step, index) => (
        <InteractiveStep key={index} step={step} />
      ))}
      <Button title="Próximo Módulo" onPress={onNext} />
    </View>
  );
}

function InteractiveStep({ step }) {
  const [userInput, setUserInput] = useState("");

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{step.instruction}</Text>
      <Text style={{ fontFamily: 'monospace', backgroundColor: '#f0f0f0', padding: 5 }}>{step.exampleCode}</Text>
      <TextInput
        style={{ borderColor: '#ccc', borderWidth: 1, marginVertical: 10, padding: 8 }}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Digite seu código aqui"
      />
      <Text>Dica: {step.hint}</Text>
    </View>
  );
}

function Quiz({ quiz }) {
  const [userAnswers, setUserAnswers] = useState(Array(quiz.length).fill(""));

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Quiz Final</Text>
      {quiz.map((question, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{question.question}</Text>
          <TextInput
            style={{ borderColor: '#ccc', borderWidth: 1, marginVertical: 10, padding: 8 }}
            value={userAnswers[index]}
            onChangeText={(text) => handleAnswerChange(index, text)}
            placeholder="Escreva sua resposta"
          />
        </View>
      ))}
      <Button title="Enviar Respostas" onPress={() => Alert.alert("Quiz enviado!", "Suas respostas foram enviadas.")} />
    </View>
  );
}

export default LearningPath;
