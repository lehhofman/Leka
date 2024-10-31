import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
    learningPath: {
        modules: [
            {
                id: 1,
                title: "1. Progressive Web Apps (PWAs)",
                description: "Aprenda a construir aplicações web progressivas que oferecem experiência semelhante a aplicativos nativos.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Configure um manifesto para sua PWA.",
                        exampleCode: "{\n  \"name\": \"Meu App\",\n  \"short_name\": \"App\",\n  \"start_url\": \"/index.html\",\n  \"display\": \"standalone\",\n  \"icons\": [\n    {\n      \"src\": \"icon.png\",\n      \"sizes\": \"192x192\",\n      \"type\": \"image/png\"\n    }\n  ]\n}",
                        hint: "O manifesto deve ser incluído no HTML com uma tag <link>.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 2,
                title: "2. API RESTful e Consumo de Dados",
                description: "Entenda como construir e consumir APIs RESTful para integrar dados em suas aplicações.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma função para consumir uma API REST usando Fetch.",
                        exampleCode: "async function fetchUsers() {\n  const response = await fetch('https://api.example.com/users');\n  return await response.json();\n}",
                        hint: "Lembre-se de tratar erros ao consumir a API.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 3,
                title: "3. Testes Automatizados com JavaScript",
                description: "Aprenda a implementar testes automatizados usando frameworks como Jest.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Escreva um teste simples para uma função que soma dois números.",
                        exampleCode: "function sum(a, b) {\n  return a + b;\n}\n\ntest('soma 1 + 2 é 3', () => {\n  expect(sum(1, 2)).toBe(3);\n});",
                        hint: "Use 'test' e 'expect' para definir testes em Jest.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 4,
                title: "4. Segurança em Aplicações Web",
                description: "Entenda as melhores práticas de segurança para proteger suas aplicações web.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Implemente uma verificação básica de segurança para prevenir XSS.",
                        exampleCode: "function sanitizeInput(input) {\n  const element = document.createElement('div');\n  element.textContent = input;\n  return element.innerHTML;\n}",
                        hint: "Sanitize o input do usuário para evitar injeções de scripts.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 5,
                title: "✏ Quiz Final Avançado",
                quiz: [
                    {
                        question: "1. O que é um manifesto em uma PWA?",
                        answerType: "multipleChoice",
                        options: [
                            "Um arquivo que define as propriedades da aplicação.",
                            "Um tipo de banco de dados.",
                            "Um documento que contém regras de estilo.",
                        ],
                        expectedAnswer: "Um arquivo que define as propriedades da aplicação.",
                    },
                    {
                        question: "2. Qual é o método HTTP usado para criar novos recursos em uma API REST?",
                        answerType: "multipleChoice",
                        options: [
                            "GET",
                            "POST",
                            "DELETE",
                        ],
                        expectedAnswer: "POST",
                    },
                    {
                        question: "3. O que o Jest permite fazer?",
                        answerType: "multipleChoice",
                        options: [
                            "Criar animações em CSS.",
                            "Escrever e executar testes automatizados em JavaScript.",
                            "Consumir APIs REST.",
                        ],
                        expectedAnswer: "Escrever e executar testes automatizados em JavaScript.",
                    },
                    {
                        question: "4. O que é XSS?",
                        answerType: "multipleChoice",
                        options: [
                            "Um tipo de ataque que envolve injeção de scripts maliciosos.",
                            "Uma técnica para otimizar o carregamento de páginas.",
                            "Uma forma de criar animações em JavaScript.",
                        ],
                        expectedAnswer: "Um tipo de ataque que envolve injeção de scripts maliciosos.",
                    },
                    {
                        question: "5. Como você pode proteger sua aplicação contra CSRF?",
                        answerType: "multipleChoice",
                        options: [
                            "Usando HTTPS.",
                            "Implementando tokens CSRF.",
                            "Minimizando o uso de cookies.",
                        ],
                        expectedAnswer: "Implementando tokens CSRF.",
                    },
                ],
            },
        ],
    },
};

const gifSource = require('./assets/robo2.png');

function LearningPath() {
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const navigation = useNavigation();
    const currentModule = learningPathData.learningPath.modules[currentModuleIndex];

    const handleNext = () => {
        if (currentModuleIndex < learningPathData.learningPath.modules.length - 1) {
            setCurrentModuleIndex(currentModuleIndex + 1);
        } else {
            navigation.navigate('Game');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{learningPathData.learningPath.title}</Text>
            <Text style={styles.description}>{learningPathData.learningPath.description}</Text>
            {currentModule.quiz ? (
                <Quiz quiz={currentModule.quiz} onFinish={handleNext} />
            ) : (
                <Module module={currentModule} onNext={handleNext} />
            )}
        </ScrollView>
    );
}

function Module({ module, onNext }) {
    return (
        <View style={styles.moduleContainer}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleDescription}>{module.description}</Text>
            {module.interactiveContent && module.interactiveContent.map((step, index) => (
                <InteractiveStep key={index} step={step} />
            ))}
            <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                <Text style={styles.nextButtonText}>Próximo Módulo</Text>
            </TouchableOpacity>
        </View>
    );
}

function InteractiveStep({ step }) {
    const [userInput, setUserInput] = useState("");

    return (
        <View style={styles.stepContainer}>
            <View style={styles.gifContainer}>
                <Image
                    source={gifSource}
                    style={styles.gif}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.stepInstruction}>{step.instruction}</Text>
            <Text style={styles.exampleCode}>{step.exampleCode}</Text>
            <TextInput
                style={styles.textInput}
                value={userInput}
                onChangeText={setUserInput}
                placeholder="Digite seu código aqui"
            />
            <Text style={styles.hint}>Dica: {step.hint}</Text>
        </View>
    );
}

function Quiz({ quiz, onFinish }) {
    const [userAnswers, setUserAnswers] = useState(Array(quiz.length).fill(""));
    const [quizFinished, setQuizFinished] = useState(false);
    const navigation = useNavigation();

    const handleAnswerChange = (index, answer) => {
        const newAnswers = [...userAnswers];
        newAnswers[index] = answer;
        setUserAnswers(newAnswers);
    };

    const calculateScore = () => {
        let score = 0;
        quiz.forEach((question, index) => {
            if (userAnswers[index] === question.expectedAnswer) {
                score++;
            }
        });

        if (score >= 3) {
            Alert.alert("Parabéns!", `Você acertou ${score} de ${quiz.length} perguntas. Você foi aprovado!`);
            navigation.navigate('Game', { score });
        } else {
            Alert.alert("Que pena!", `Você acertou apenas ${score} de ${quiz.length} perguntas. Tente novamente!`);
            resetQuiz();
        }
    };

    const resetQuiz = () => {
        setUserAnswers(Array(quiz.length).fill(""));
        setQuizFinished(false);
    };

    return (
        <View style={styles.quizContainer}>
            <Text style={styles.quizTitle}>Quiz Final</Text>
            {quiz.map((question, index) => (
                <View key={index} style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.question}</Text>
                    {question.answerType === "multipleChoice" ? (
                        question.options.map((option, optionIndex) => (
                            <TouchableOpacity
                                key={optionIndex}
                                style={[styles.optionButton, userAnswers[index] === option && styles.selectedOptionButton]}
                                onPress={() => handleAnswerChange(index, option)}
                            >
                                <Text style={[styles.optionText, userAnswers[index] === option ? styles.optionTextSelected : styles.optionTextDefault]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <TextInput
                            style={styles.textInput}
                            value={userAnswers[index]}
                            onChangeText={(text) => handleAnswerChange(index, text)}
                            placeholder="Sua resposta"
                        />
                    )}
                </View>
            ))}
            <TouchableOpacity style={styles.calculateButton} onPress={calculateScore}>
                <Text style={styles.buttonText}>Calcular Pontuação</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#333',
    },
    gif: {
        width: 200,
        height: 200,
    },
    gifContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    moduleContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#333',
        borderRadius: 8,
    },
    moduleTitle: {
        fontSize: 22,
        color: '#fff3db',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    moduleDescription: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stepContainer: {
        marginBottom: 15,
    },
    stepInstruction: {
        fontSize: 18,
        color: '#f7e1c9',
        fontWeight: 'bold',
    },
    exampleCode: {
        fontSize: 14,
        color: '#4d1948',
        backgroundColor: '#f7e1c9',
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#666',
        color: '#000',
        backgroundColor: '#f7e1c9',
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    hint: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 5,
    },
    quizContainer: {
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    quizTitle: {
        fontSize: 26,
        color: '#f7e1c9',
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 15,
    },
    questionContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#cb9fc6',
        borderRadius: 8,
    },
    questionText: {
        fontSize: 18,
        color: '#4d1948',
        fontWeight: 'bold',
    },
    optionButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#666',
        backgroundColor: '#f7e1c9',
        borderRadius: 8,
        marginTop: 10,
    },
    selectedOptionButton: {
        backgroundColor: '#b03892',
        borderColor: '#fff',
    },
    optionText: {
        color: '#4d1948',
        fontSize: 16,
        textAlign: 'center',
    },
    optionTextSelected: {
        color: '#fff',
    },
    optionTextDefault: {
        color: '#4d1948',
    },
    calculateButton: {
        padding: 15,
        backgroundColor: '#b03892',
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    nextButton: {
        padding: 15,
        backgroundColor: '#b03892',
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LearningPath;
