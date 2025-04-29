import Fallback from "@/components/Fallback";
import Colors from "@/constants/Colors";
import { migrateDbIfNeeded } from "@/hooks/DB";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
    let colorScheme = useColorScheme()
    if (colorScheme == null) {
        colorScheme = 'light'
    }
    const theme = Colors[colorScheme]

    return <Suspense fallback={<Fallback />}>
        <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded} useSuspense>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.tabIconSelected,
                    tabBarInactiveTintColor: theme.tabIconDefault,
                    tabBarStyle: {
                        backgroundColor: theme.background,
                        paddingTop: 5,
                        height: 60,
                    },
                }}
            >
                <Tabs.Screen name="index" options={{
                    title: "График",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={30}
                            name={focused ? "bar-chart" : "bar-chart-outline"}
                            color={focused ? theme.tabIconSelected : theme.tabIconDefault}
                        />
                    )
                }} />
                <Tabs.Screen name="spends" options={{
                    title: "Зардал",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={30}
                            name={focused ? "cash" : "cash-outline"}
                            color={focused ? theme.tabIconSelected : theme.tabIconDefault}
                        />
                    )
                }} />
                <Tabs.Screen name="categories" options={{
                    title: "Ангилал",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={30}
                            name={focused ? "list-circle" : "list-circle-outline"}
                            color={focused ? theme.tabIconSelected : theme.tabIconDefault}
                        />
                    )
                }} />
            </Tabs>
        </SQLiteProvider>
    </Suspense>
        ;
}
