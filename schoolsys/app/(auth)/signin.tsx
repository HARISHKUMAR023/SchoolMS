import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { router } from "expo-router";
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.127.92:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the token is returned in data.token
        await AsyncStorage.setItem('userToken', data.token);
        router.push('/home');  // Navigate to the home page
      } else {
        Alert.alert('Sign In Failed', data.message || 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Sign In Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/icone/black.svg')}
      />
      <Text style={styles.title}>Welcome to School Sys</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity 
        style={[styles.signInButton, loading && { backgroundColor: '#ccc' }]} 
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text style={styles.signInButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logo: {
    width: 80,
    height: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  signInButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007bff",
  },
});

export default SignIn;
