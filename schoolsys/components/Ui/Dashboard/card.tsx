import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const Card = ({ title, value, color1, color2, icon }) => {
  return (
    <LinearGradient colors={[color1, color2]} style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={40} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  value: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Card;
