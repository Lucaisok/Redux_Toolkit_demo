import { Pressable, StyleSheet, Text, View } from "react-native";
import { User } from "../features/users/types";
import { FC, useState } from "react";
import { UserDetails } from "./UserDetails";

interface UserCardProps {
    user: User;
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <View style={styles.row}>
                <Text>{user.first_name} {user.last_name}</Text>
                <Pressable onPress={() => setCollapsed(!collapsed)}>
                    <Text>{collapsed ? 'Show Details' : 'Hide Details'}</Text>
                </Pressable>
            </View>
            {!collapsed && <UserDetails userId={user.id} />}
        </>

    );
};

const styles = StyleSheet.create(
    {
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
    }
);