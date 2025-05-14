import React, { useEffect, useState } from 'react';
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
import { SpendType } from '@/types';

interface Props {
    visible: boolean;
    onClose: () => void;
    parentOptions: any[]
    categoryId: string
}

const SpendUpdateModal: React.FC<Props> = ({ visible, onClose, parentOptions, categoryId }) => {
    const database = useDatabase()
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState(parentOptions[0]?.id);
    const [cost, setCost] = useState(0);
    useEffect(() => {
        const fetchCategory = async () => {
            const cat = await database.get('spends').find(categoryId);
            setName((cat as any).desc); // Use type assertion if Model lacks these properties
            setParentId((cat as any).category_id);
            setCost((cat as any).cost);
        };
        fetchCategory();
    }, [])

    const handleSave = async () => {
        onClose();
        await database.write(async () => {
            const category = await database.get('spends').find(categoryId)
            await category.update(record => {
                const category = record as SpendType;
                category.desc = name;
                category.category_id = parentId
                category.cost = cost
            })
        })
    };

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <ThemedView style={styles.backdrop}>
                <ThemedView style={styles.modalContent}>
                    <ThemedText style={styles.title}>Edit Spend</ThemedText>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        value={cost + ''}
                        keyboardType='number-pad'
                        onChangeText={(e) => setCost(parseInt(e))}
                    />

                    <Picker
                        selectedValue={parentId}
                        onValueChange={(itemValue) => setParentId(itemValue)}
                        style={styles.picker}
                    >
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

export default SpendUpdateModal;

