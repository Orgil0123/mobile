import CategoryCreateModal from "@/components/CategoryCreateModal";
import Container from "@/components/Container";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { CategoryType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useDatabase } from "@nozbe/watermelondb/react";
import { useState } from "react";
import { Q } from '@nozbe/watermelondb'
import SpendCreateModal from "@/components/SpendCreateModal";
import LineChartByDays from "@/components/LineChartByDays";
import PieChartByCategory from "@/components/PieChartByCategory";

export default function Index() {
    const database = useDatabase()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [parentOptions, setParentOptions] = useState<CategoryType[]>([])
    const create = async () => {
        setShowCreateModal(true)
        const parentOptions = await database.collections.get('categories').query(Q.where('parent_id', Q.notEq(null))).fetch() as CategoryType[]
        setParentOptions(parentOptions)
    }

    return (
        <Container>
            <ThemedView style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemedText title>График, үзүүлэлтүүд</ThemedText>
                <ThemedButton onPress={create}>
                    <Ionicons
                        name='add'
                        size={24}
                    />
                </ThemedButton>
            </ThemedView>
            <ThemedView>
                <LineChartByDays />
                <PieChartByCategory />
            </ThemedView>
            <SpendCreateModal visible={showCreateModal} onClose={() => { setShowCreateModal(false) }} parentOptions={parentOptions} />
        </Container>
    )
}
