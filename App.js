import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './views/HomeScreen';
import EditTaskScreen from './views/EditTaskScreen';
import ExportTaskScreen from './views/ExportTaskScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Edit Task" component={EditTaskScreen} />
          <Tab.Screen name="Export Task" component={ExportTaskScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;