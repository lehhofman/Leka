import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LearningTimeScreen = () => {
  const [selectedOption, setSelectedOption] = useState("Casual");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    Alert.alert(`Você selecionou o modo ${selectedOption}`);
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Quanto tempo você quer gastar aprendendo?</Text>
      <Text style={styles.subtitle}>Você sempre vai poder alterar esta meta!</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "Casual" && styles.selectedOption
          ]}
          onPress={() => handleOptionChange("Casual")}
        >
          <Text style={styles.optionText}>Casual - 5 Minutos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "Regular" && styles.selectedOption
          ]}
          onPress={() => handleOptionChange("Regular")}
        >
          <Text style={styles.optionText}>Regular - 10 Minutos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "Sério" && styles.selectedOption
          ]}
          onPress={() => handleOptionChange("Sério")}
        >
          <Text style={styles.optionText}>Sério - 20 Minutos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
        <Text style={styles.continueButtonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    textAlign: "center",
    padding: 20,
    backgroundColor: "#282828",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    backgroundColor: "#5E4B80",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    width: "80%",
    maxWidth: 300,
  },
  option: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  selectedOption: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#9E69F7",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LearningTimeScreen;
