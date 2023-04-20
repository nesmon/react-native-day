import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { List, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });

    return unsubscribe;
  }, [navigation]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheck = async (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          done: !t.done,
        };
      } else {
        return t;
      }
    });

    setTasks(updatedTasks);

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      description={item.description}
      onPress={() => handleCheck(item)}
      left={() => (
        <Checkbox.Android
          status={item.done ? 'checked' : 'unchecked'}
          onPress={() => handleCheck(item)}
        />
      )}
      titleStyle={item.done ? { textDecorationLine: 'line-through' } : null}
      descriptionStyle={item.done ? { textDecorationLine: 'line-through' } : null}
    />
  );

  return (
    <View>
      <Text style={styles.text}>Voici votre liste de taches : </Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  }
});

export default HomeScreen;