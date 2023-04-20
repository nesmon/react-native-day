import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ExportTaskScreen = () => {
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

    const getCompletedTasks = () => {
        return tasks.filter((task) => task.done);
    };

    const getPendingTasks = () => {
        return tasks.filter((task) => !task.done);
    };

    const handleExport = async (exportTasks, fileName) => {
        try {
            // TODO: Fix why didnt export the file
            const fileUri = FileSystem.cacheDirectory + fileName;
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(exportTasks));
            await Sharing.shareAsync(fileUri, {
                mimeType: 'application/json',
                dialogTitle: 'Export your tasks',
                UTI: 'public.json'
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.taskDetails}>
                <View style={[styles.taskBox, styles.totalBox]}>
                    <Text style={styles.textBox}>Total</Text>
                    <Text style={styles.textBox}>{tasks.length}</Text>
                </View>
                <View style={[styles.taskBox, styles.completedBox]}>
                    <Text style={styles.textBox}>Completed</Text>
                    <Text style={styles.textBox}>{getCompletedTasks().length}</Text>
                </View>
                <View style={[styles.taskBox, styles.pendingTask]}>
                    <Text style={styles.textBox}>Pending</Text>
                    <Text style={styles.textBox}>{getPendingTasks().length}</Text>
                </View>
            </View>
            <View style={styles.separator} />
            <Text>Export your tasks</Text>
            <View style={styles.exportButtonView}>
                <Button style={styles.exportButton} onPress={() => handleExport(tasks, 'allTasks.json')}>
                    Export all tasks
                </Button>
                <Button style={styles.exportButton} onPress={() => handleExport(getCompletedTasks(), 'completTasks.json')}>
                    Export completed tasks
                </Button>
                <Button style={styles.exportButton} onPress={() => handleExport(getPendingTasks(), 'pendingTask.json')}>
                    Export pending tasks
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    exportButtonView: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    exportButton: {
        margin: 5,
        backgroundColor: '#f4a507',
    },
    taskDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    taskBox: {
        width: 100,
        height: 100,
        borderRadius: 8,
        justifyContent: 'center',
    },
    totalBox: {
        backgroundColor: '#0092d6',
    },
    completedBox: {
        backgroundColor: '#00e800',
    },
    pendingTask: {
        backgroundColor: '#f4a507',
    },
    textBox: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
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

export default ExportTaskScreen;