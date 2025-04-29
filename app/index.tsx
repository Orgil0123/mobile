import { Category } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
    const db = useSQLiteContext();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function setup() {
            const result = await db.getAllAsync<Category>('SELECT * FROM categories');
            setCategories(result);
        }
        setup();
    }, []);

    return (
        <View>
            {categories.map((category, index) => (
                <View key={index}>
                    <Text>{`${category.id} - ${category.parent_id}`}</Text>
                </View>
            ))}
        </View>
    );
}
