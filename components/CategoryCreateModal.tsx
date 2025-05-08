import React, { useState } from 'react';
import {
    Modal,
    TextInput,
    Button,
    StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import { useDatabase } from '@nozbe/watermelondb/react';
import { CategoryType } from '@/types';
import { Model } from '@nozbe/watermelondb';

interface Props {
    visible: boolean;
    onClose: () => void;
    parentOptions: any[]
}

const CategoryCreateModal: React.FC<Props> = ({ visible, onClose, parentOptions }) => {
    const database = useDatabase()
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState(null);

    const handleSave = async () => {
        onClose();
        await database.write(async () => {
            await database.get('categories').create((record: Model) => {
                const category = record as CategoryType;
                category.name = name;
                category.parent_id = parentId
            });
        })
        setName('');
        setParentId(null);
    };

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <ThemedView style={styles.backdrop}>
                <ThemedView style={styles.modalContent}>
                    <ThemedText style={styles.title}>Add New Category</ThemedText>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Picker
                        selectedValue={parentId}
                        onValueChange={(itemValue) => setParentId(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item key={'000'} label={'Ерөнхий ангилал'} value={null} />
                        {parentOptions.map((option, index) => (
                            <Picker.Item key={index} label={option.name} value={option.id} />
                        ))}
                    </Picker>

                    <ThemedText style={styles.buttons}>
                        <Button title="Cancel" onPress={onClose} color="#999" />
                        <Button title="Save" onPress={handleSave} />
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CategoryCreateModal;

