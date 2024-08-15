import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Tab() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove the JWT token
      router.push('/signin'); // Navigate to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* <Text>Tab attdence</Text> */}
      <TouchableOpacity onPress={handleLogout}>
  <Text>Logout</Text>
</TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
