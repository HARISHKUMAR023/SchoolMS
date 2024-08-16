import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { router } from "expo-router";
export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab timetable</Text>

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
