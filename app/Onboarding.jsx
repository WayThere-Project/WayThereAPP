import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useRouter } from 'expo-router';



const Card = ({ onPress, selected, onRadioClick, criteria, radioButtonContainerStyle }) => {
  const getImageSource = () => {
    if (criteria === "1. Available Rides") {
      return require('../assets/map.png'); // Use map icon for Available Rides
    }
    else if (criteria === "3. Price Details") {
      return require('../assets/person.png'); // Use map icon for Available Rides
    }
    else if (criteria === "2. Driver") {
      return require('../assets/car.png'); // Use map icon for Available Rides
    }
    return require('../assets/dollar-sign.png'); // Default to dollar sign for other cards
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, selected && styles.highlightedCard]}>
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Image
            source={getImageSource()} // Dynamically setting the source based on criteria
            style={styles.icon}
          />
        </View>
        <Text style={styles.text}>{criteria}</Text>
        <TouchableOpacity onPress={onRadioClick} style={[styles.radioButtonContainer, radioButtonContainerStyle, selected && styles.radioButtonSelected]}>
          <View style={[styles.outerCircle, selected && styles.outerCircleSelected]}>
            {selected && <View style={styles.innerCircle} />}
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};


const OnboardingScreen = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleRadioClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleSearch = () => {
    if (selectedCard === 1) {
      router.push('/Search');
    } else {
      setSearchResults([`Search results for criteria ${selectedCard}`]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>What route do you need?</Text>
      <View style={styles.cardsContainer}>
        <Card
          onPress={() => handleCardClick(1)}
          selected={selectedCard === 1}
          onRadioClick={() => handleRadioClick(1)}
          criteria="1. Available Rides"
          radioButtonContainerStyle={styles.radioButtonContainer1}
        />
        <Card
          onPress={() => handleCardClick(2)}
          selected={selectedCard === 2}
          onRadioClick={() => handleRadioClick(2)}
          criteria="2. Driver"
          radioButtonContainerStyle={styles.radioButtonContainer2}
        />
        <Card
          onPress={() => handleCardClick(3)}
          selected={selectedCard === 3}
          onRadioClick={() => handleRadioClick(3)}
          criteria="3. Price Details"
          radioButtonContainerStyle={styles.radioButtonContainer3}
        />
        <Card
          onPress={() => handleCardClick(4)}
          selected={selectedCard === 4}
          onRadioClick={() => handleRadioClick(4)}
          criteria="4. Chat Feature"
          radioButtonContainerStyle={styles.radioButtonContainer4}
        />
      </View>
      {selectedCard !== null && (
        <View style={styles.buttonContainer}>
          <Button
            title="Search"
            buttonStyle={styles.button}
            onPress={handleSearch}
          />
        </View>
      )}
      <View style={styles.searchResults}>
        {searchResults.map((result, index) => (
          <Text key={index}>{result}</Text>
        ))}
      </View>
    </View>
  );
};

export default OnboardingScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100, // Add padding to move all cards down
  },
  buttonContainer: {
    marginBottom: 20, // Move the button to the bottom with margin
  },
  button: {
    backgroundColor: 'blue',
    width: 270,
    height: 50,
  },
  card: {
    width: 327,
    height: 74,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align content to the left
    paddingLeft: 20, // Add padding to align content away from the card border
    marginBottom: 20, // Add margin at the bottom of each card
  },
  content: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically
  },
  text: {
    marginLeft: 10, // Add space between text and box
    fontWeight: 'bold', // Make the text bold
  },
  iconBox: {
    width: 40, // Set the width of the box
    height: 40, // Set the height of the box
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Change the background color to white
    borderWidth: 1, // Add border width
    borderColor: 'black', // Add border color
  },
  icon: {
    width: 20,
    height: 20,
  },
 
  radioButtonContainer1: {
    marginLeft: 100, // Push the container to the right
  },
  radioButtonContainer2: {
    marginLeft: 160, // Custom positioning for card 2
  },
  radioButtonContainer3: {
    marginLeft: 120, // Custom positioning for card 3
  },
  radioButtonContainer4: {
    marginLeft: 123, // Custom positioning for card 4
  },
  radioButtonSelected: {
    marginLeft: 10, // Add space between text and radioButton
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircleSelected: {
    backgroundColor: '#ffffff', // Change outer circle color to white
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue', // Change inner circle color to blue
  },
  searchResults: {
    marginTop: 20,
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    position: 'absolute',
    top: 90,
    alignSelf: 'center', // Center the question text horizontally
  },
  highlightedCard: {
    backgroundColor: '#f0f0f0', // Highlighted background color
  },
});