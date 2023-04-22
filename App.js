import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importation des icônes

import HomeScreen from './views/HomeScreen';
import EditTaskScreen from './views/EditTaskScreen';
import ExportTaskScreen from './views/ExportTaskScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen 
          name="Edit Task" 
          component={EditTaskScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pencil-outline" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen 
          name="Export Task" 
          component={ExportTaskScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="share-outline" color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
