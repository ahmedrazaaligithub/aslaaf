import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import theme from '@/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 60, // Default tab bar height
          backgroundColor: theme.colors.white,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 }, // Shadow on top
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
          borderTopWidth: 0, // Remove default border
        },
        tabBarIconStyle: ({ focused }) => ({
          height: focused ? 65 : 60, // Increase height of selected tab
          marginTop: focused ? -5 : 0, // Adjust positioning for selected tab
          shadowColor: focused ? '#000' : 'transparent', // Apply shadow only to selected tab
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: focused ? 5 : 0,
        }),
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={focused ? theme.colors.primary : theme.colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: 'Location',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'location' : 'location-outline'}
              color={focused ? theme.colors.primary : theme.colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'search' : 'search-outline'}
              color={focused ? theme.colors.primary : theme.colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notification',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={focused ? theme.colors.primary : theme.colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="aaraas"
        options={{
          title: 'Aaraas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={focused ? theme.colors.primary : theme.colors.primary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
