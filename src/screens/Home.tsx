import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, StatusBar, Button } from "react-native";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { UsersList } from "../components/UsersList";
import { fetchUsers } from "../store/users";
import { User } from "../features/users/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export type ActiveTab = "All" | "Followed";

export default function Home() {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<ActiveTab>("All");
    const [resultsList, setResultsList] = useState<User[]>([]);
    const [textValue, setTextValue] = useState<string>("");

    const users = useSelector((state: RootState) => state.users.users);
    const followedUsers = useSelector((state: RootState) => state.users.followedUsers);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);

    const usersToDisplay = activeTab === "All" ? users : followedUsers;

    const onChangeText = (text: string) => {
        const q = text.toLowerCase();
        setTextValue(q);
        const filteredUsers = usersToDisplay.filter((user: User) => user.first_name.toLowerCase().includes(q) || user.last_name.toLowerCase().includes(q));
        setResultsList(filteredUsers);
    };

    const toggleActiveTab = useCallback((tab: ActiveTab) => {
        setActiveTab(tab);
    }, []);

    const getUsersToDisplay = () => {
        return textValue === "" ? usersToDisplay : resultsList;
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    if (loading) {
        return <View style={styles.container}><Header activeTab={activeTab} toggleActiveTab={toggleActiveTab} /><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View></View>;
    }

    if (error) {
        return <View style={styles.container}><Header activeTab={activeTab} toggleActiveTab={toggleActiveTab} /><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Error: {error}</Text></View></View>;
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={'#f5f5f5'} />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header activeTab={activeTab} toggleActiveTab={toggleActiveTab} />
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            margin: 10,
                            paddingLeft: 10,
                            borderRadius: 5,
                        }}
                        placeholder="Search"
                        onChangeText={text => onChangeText(text)}
                        value={textValue}
                    />
                    <UsersList users={getUsersToDisplay()} />
                    <Button title="Go to MyBooksList" onPress={() => {
                        navigation.navigate('MyBooksList' as never);
                    }} />
                </View>
            </SafeAreaView>
        </>

    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        }
    }
);