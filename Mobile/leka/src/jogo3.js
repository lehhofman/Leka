import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const learningPathData = {
    learningPath: {
        modules: [
            {
                id: 1,
                title: "1. HTML5 Semântico e Acessibilidade",
                description: "Aprofunde-se no uso de HTML semântico e nas melhores práticas de acessibilidade.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Adicione atributos ARIA a um menu de navegação para melhorar a acessibilidade.",
                        exampleCode: "<nav aria-label='Menu Principal'>\n  <ul>\n    <li><a href='#' aria-current='page'>Home</a></li>\n  </ul>\n</nav>",
                        hint: "Use ARIA para fornecer informações adicionais sobre elementos da interface.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 2,
                title: "2. CSS Grid Avançado e Layout Responsivo",
                description: "Domine o CSS Grid para criar layouts responsivos e complexos.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie um layout de grade responsivo usando CSS Grid.",
                        exampleCode: ".container {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 10px;\n}\n.item {\n  background-color: #efefef;\n  padding: 20px;\n}",
                        hint: "Use 'repeat()' e 'minmax()' para tornar o layout responsivo.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 3,
                title: "3. JavaScript ES6+ e Funcionalidades Modernas",
                description: "Explore as novas funcionalidades do JavaScript ES6+, como destructuring e módulos.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Utilize destructuring para extrair valores de um objeto.",
                        exampleCode: "const user = { name: 'Alice', age: 25 };\nconst { name, age } = user;\nconsole.log(name, age);",
                        hint: "Destructuring torna o código mais limpo e legível.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 4,
                title: "4. Web APIs e Manipulação Avançada do DOM",
                description: "Aprenda a trabalhar com Web APIs, como a API de Fetch e a API de Web Storage.",
                interactiveContent: [
                    {
                        step: 1,
                        instruction: "Crie uma aplicação que salva dados no Local Storage.",
                        exampleCode: "localStorage.setItem('user', JSON.stringify(user));\nconst retrievedUser = JSON.parse(localStorage.getItem('user'));",
                        hint: "Use JSON.stringify() para armazenar objetos no Local Storage.",
                        userResponse: "code",
                    },
                ],
            },
            {
                id: 5,
                title: "✏ Quiz Final Avançado",
                quiz: [
                    {
                        question: "1. Qual é a função do atributo ARIA 'aria-label'?",
                        answerType: "multipleChoice",
                        options: [
                            "Define a largura de um elemento.",
                            "Fornece uma descrição acessível de um elemento.",
                            "Adiciona um estilo CSS.",
                        ],
                        expectedAnswer: "Fornece uma descrição acessível de um elemento.",
                    },
                    {
                        question: "2. O que a propriedade 'grid-template-areas' faz no CSS Grid?",
                        answerType: "multipleChoice",
                        options: [
                            "Define a cor de fundo da grade.",
                            "Especifica como os itens são organizados na grade.",
                            "Cria animações de grade.",
                        ],
                        expectedAnswer: "Especifica como os itens são organizados na grade.",
                    },
                    {
                        question: "3. Como você exporta uma função em um módulo ES6?",
                        answerType: "multipleChoice",
                        options: [
                            "module.export = minhaFuncao;",
                            "export default minhaFuncao;",
                            "export minhaFuncao;",
                        ],
                        expectedAnswer: "export default minhaFuncao;",
                    },
                    {
                        question: "4. Qual é o propósito do Local Storage no JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "Armazenar dados temporariamente em cache.",
                            "Armazenar dados de forma persistente no navegador.",
                            "Criar cookies.",
                        ],
                        expectedAnswer: "Armazenar dados de forma persistente no navegador.",
                    },
                    {
                        question: "5. O que é destructuring no JavaScript?",
                        answerType: "multipleChoice",
                        options: [
                            "Uma forma de manipular o DOM.",
                            "Uma técnica para extrair dados de arrays e objetos.",
                            "Um método para criar novos objetos.",
                        ],
                        expectedAnswer: "Uma técnica para extrair dados de arrays e objetos.",
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
