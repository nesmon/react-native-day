import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TextInput, Button, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid/non-secure';

const EditTaskScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const jsonTasks = await AsyncStorage.getItem('tasks');
        const loadedTasks = jsonTasks != null ? JSON.parse(jsonTasks) : [];
        setTasks(loadedTasks);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const addTask = async () => {
        const newTask = { id: nanoid(), title: title, description: description, completed: false };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTitle('');
        setDescription('');
    };

    const handleDelete = async (task) => {
        const filteredTasks = tasks.filter((t) => t.id !== task.id);

        setTasks(filteredTasks);

        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
        } catch (e) {
            console.error(e);
        }
    };

    const renderItem = ({ item }) => (
        <List.Item
            key={item.id}
            title={item.title}
            description={item.description}
            right={() => (
                <IconButton icon="delete" onPress={() => handleDelete(item)} />
            )}
        />
    );

    return (
        <View style={styles.container}>
            <TextInput
                label="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
            />
            <Button mode="contained" onPress={() => addTask()}>
                Add Task
            </Button>
            {/* Add a visual separator like a line */}
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 16 }} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 16,
    },
});

export default EditTaskScreen;