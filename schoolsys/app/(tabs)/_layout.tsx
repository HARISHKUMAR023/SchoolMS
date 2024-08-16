import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        
        tabBarActiveTintColor: '#007bff', // Change the active tab color to a primary blue
        tabBarInactiveTintColor: '#8e8e8e', // Inactive tab color
        tabBarStyle: styles.tabBar, // Custom tab bar style
        tabBarLabelStyle: styles.tabLabel, // Custom tab label style
        tabBarIconStyle: styles.tabIcon, // Custom icon style
        headerShown: false, // Hide the default header for a cleaner look
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="dashboard" size={28} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="attendence"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="users-viewfinder" size={28} color="black" />
          ),
        }}
      />
        <Tabs.Screen
        name="timetable"
        options={{
          title: 'Timetable',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="timetable" size={28} color="black" />
          ),
        }}
      />
       <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff', // White background for the tab bar
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Light gray border
    paddingBottom: 5,
    paddingTop: 5,
    height: 60, // Increase height for better touch targets
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5, // Space between the icon and the label
  },
  tabIcon: {
    marginBottom: -5, // Move the icon up slightly
  },
});
