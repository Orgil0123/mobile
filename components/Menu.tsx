import React, { useState, useRef } from 'react';
import { useColorScheme } from 'react-native';
import Popover from 'react-native-popover-view';
import ThemedButton from './ThemedButton';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from './ThemedView';
import ThemedCard from './ThemedCard';
import Colors from '@/constants/Colors';
import ThemedText from './ThemedText';
import Spacer from './Spacer';

type MenuProps = {
    edit: (cat: string) => void
    destroy: (cat: string) => void
    cat: string
}
export default function Menu({ destroy, edit, cat }: MenuProps) {
    const [showPopover, setShowPopover] = useState(false);
    const buttonRef = useRef(null);
    let colorScheme = useColorScheme()
    if (colorScheme == null) {
        colorScheme = 'light'
    }
    const theme = Colors[colorScheme]
    return (
        <ThemedView>
            <ThemedButton
                ref={buttonRef}
                accessible
                accessibilityState={{ expanded: showPopover }}
                onPress={() => setShowPopover(true)}
                padding={5}
            >
                <Ionicons
                    name='pencil'
                    size={16}
                />
            </ThemedButton>

            <Popover
                isVisible={showPopover}
                from={buttonRef}
                onRequestClose={() => setShowPopover(false)}
                popoverStyle={{ backgroundColor: theme.cardBackground }}
            >
                <ThemedCard style={{ padding: 5 }} accessible accessibilityLabel="Category options">
                    <ThemedButton
                        onPress={() => {
                            edit(cat)
                            setShowPopover(false)
                        }}
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'green' }}
                    >
                        <Ionicons
                            name='pencil'
                            size={24}
                        />
                        <ThemedText>
                            Засах
                        </ThemedText>
                    </ThemedButton>
                    <Spacer height={5} />
                    <ThemedButton
                        onPress={() => {
                            destroy(cat)
                            setShowPopover(false)
                        }}
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'red' }}
                    >
                        <Ionicons
                            name='trash'
                            size={24}
                        />
                        <ThemedText>
                            Устгах
                        </ThemedText>
                    </ThemedButton>
                </ThemedCard>
            </Popover>
        </ThemedView>
    );
}
