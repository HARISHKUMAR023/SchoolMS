import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const AuthLoadingScreen = () => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        router.push('/home'); // Navigate to tab page if logged in
      } else {
        router.push('/signin'); // Navigate to login page if not logged in
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthLoadingScreen;
