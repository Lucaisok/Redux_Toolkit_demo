import { Pressable, Text, View, StyleSheet } from "react-native";
import { ActiveTab } from "../screens/Home";
import { FC } from "react";

interface HeaderProps {
    activeTab: ActiveTab;
    toggleActiveTab: (tab: ActiveTab) => void;
}

export const Header: FC<HeaderProps> = ({ activeTab, toggleActiveTab }) => {
    return (
        <View style={styles.tabsContainer}>
            <Pressable
                style={[styles.tab, activeTab === 'All' ? styles.activeTab : {}]}
                onPress={() => toggleActiveTab('All')}
            >
                <Text style={styles.tabText}>Users</Text>
            </Pressable>
            <Pressable
                style={[styles.tab, activeTab === 'Followed' ? styles.activeTab : {}]}
                onPress={() => toggleActiveTab('Followed')}
            >
                <Text style={styles.tabText}>Folowed</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        tabsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
            paddingTop: 10,
        },
        tab: {
            flex: 1,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 3,
            borderColor: 'transparent',
        },
        activeTab: {
            borderColor: '#007bff',
        },
        tabText: {
            color: 'black',
            fontWeight: '600',
        },
        buttonText: {
            color: 'black',
        },
    });