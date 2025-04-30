import Fallback from "@/components/Fallback";
import Colors from "@/constants/Colors";
import { migrateDbIfNeeded } from "@/hooks/DB";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from '../model/schema'
import migrations from '../model/migrations'
import Category from "@/model/Category";
import Spend from "@/model/Spend";
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment it out for development purposes -- see Migrations documentation)
    migrations,
    // (optional database name or file system path)
    // dbName: 'myapp',
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: true, /* Platform.OS === 'ios' */
    // (optional, but you should implement this method)
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
    }
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
        Category, Spend
    ],
})

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

