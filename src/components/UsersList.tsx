import { FlatList, StyleSheet, View } from "react-native";
import { User } from "../features/users/types";
import { FC } from "react";
import { UserCard } from "./UserCard";

interface UsersListProps {
    users: User[];
}

export const UsersList: FC<UsersListProps> = ({ users, }) => {
    const keyExtractor = (item: User, index: number) => `${item.id}_${String(index)}`;
    const renderItem = ({ item }: { item: User; }) => <UserCard user={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatListStyle}
                data={users}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListStyle: {
        flex: 1,
    },
});