import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';

function WriteFileScreen() {
    const [text, setText] = useState('');
    const [fileContent, setFileContent] = useState('');

    const fileName = 'text.txt';
    const dir = FileSystem.documentDirectory;
    const fileUri = dir + fileName;

    initContent = async () => {
        try {
            if (!await FileSystem.getInfoAsync(fileUri)) {
                await FileSystem.writeAsStringAsync(fileUri, 'Hello World!');
            }

            const file = await FileSystem.readAsStringAsync(fileUri);

            setFileContent(file);
        } catch (error) {
            console.error('Error saving file: ', error);
        }
    };

    initContent();

    const writeToFile = async () => {
        try {
          await FileSystem.writeAsStringAsync(fileUri, text);
        } catch (error) {
          console.error('Error saving file: ', error);
        }
    };

    const sendByMail = async () => {
        try {
            const mail = {
                subject: 'File',
                body: 'File attached',
                attachments: [
                    fileUri,  
                ],
            };
    
            await MailComposer.composeAsync(mail);
    
            console.log('Mail sent');
        } catch (error) {
            console.error('Error sending mail: ', error);
        }   
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Write File Screen</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setText(text)}
                value={fileContent}
                defaultValue={fileContent}
                multiline={true}
            />
            <View style={styles.buttonLine}>
                <Button
                    title="Save"
                    onPress={writeToFile}
                    color="green"
                />
                <Button
                    title="Mail"
                    onPress={sendByMail}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
    },
    input: {
        height: 100,
        margin: 3,
        borderWidth: 1,
        width: '95%',

    },
    buttonLine: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default WriteFileScreen;