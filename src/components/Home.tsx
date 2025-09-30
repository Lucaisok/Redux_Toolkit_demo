import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Header } from "./Header";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { UsersList } from "./UsersList";
import { fetchUsers } from "../store/users";

export type ActiveTab = "All" | "Followed";

export default function Home() {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<ActiveTab>("All");

    const users = useSelector((state: RootState) => state.users.users);
    console.log("Users from state:", users);
    const followedUsers = useSelector((state: RootState) => state.users.followedUsers);
    const usersToDisplay = activeTab === "All" ? users : followedUsers;

    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const toggleActiveTab = useCallback((tab: ActiveTab) => {
        setActiveTab(tab);
    }, []);

    if (loading) {
        return <View style={styles.container}><Header activeTab={activeTab} toggleActiveTab={toggleActiveTab} /><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View></View>;
    }

    if (error) {
        return <View style={styles.container}><Header activeTab={activeTab} toggleActiveTab={toggleActiveTab} /><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Error: {error}</Text></View></View>;
    }

    return (
        <View style={styles.container}>
            <Header activeTab={activeTab} toggleActiveTab={toggleActiveTab} />
            <UsersList users={usersToDisplay} />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        }
    }
);