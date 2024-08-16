import { View, Text, StyleSheet,TouchableOpacity,ScrollView,SafeAreaView } from 'react-native';
import { router } from "expo-router";
import Card from '@/components/Ui/Dashboard/card';
export default function Tab() {
  const totalStudents = 150;
  const totalEmployees = 30;
  const totalEmployeesPresent = 25;
  const feesPending = 10000;
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
    <Card 
      title="Total Students" 
      value="150" 
      color1="#FF5733" 
      color2="#FF8D1A" 
      icon="school" 
    />
    <Card 
      title="Total Employees" 
      value="30" 
      color1="#33B5E5" 
      color2="#0099CC" 
      icon="people" 
    />
    <Card 
      title="Total Employees Present" 
      value="25" 
      color1="#00C851" 
      color2="#007E33" 
      icon="check-circle" 
    />
    <Card 
      title="Fees Pending" 
      value="₹10,000" 
      color1="#FF4444" 
      color2="#CC0000" 
      icon="money-off" 
    />
  </ScrollView>
  </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:'#ffffff',
  },
});
