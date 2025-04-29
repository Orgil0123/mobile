import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    cell: {
        flex: 1,
    },
});
