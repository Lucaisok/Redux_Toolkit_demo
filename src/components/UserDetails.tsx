import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { User } from "../features/users/types";
import { handleFollowUser } from "../features/users/usersSlice";
import { FC, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../store/store";

interface UserDetailsProps {
    userId: number;
}

export const UserDetails: FC<UserDetailsProps> = ({ userId }) => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const favoriteUsers = useSelector((state: RootState) => state.users.followedUsers);

    const followUser = (user: User) => {
        dispatch(handleFollowUser(user.id));
    };

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(`https://reqres.in/api/users/${userId}`, {
                    headers: {
                        "x-api-key": "reqres-free-v1",
                    }
                }
                );
                const data = await response.json();
                setUser(data.data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
            setLoading(false);
        }
        fetchData();
    }, [userId]);

    if (loading) {
        return <Text>Loading user details...</Text>;
    }
    if (!user) {
        return <Text>No user details available.</Text>;
    }

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={{ uri: user?.avatar }} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{user?.first_name}</Text>
                <Text style={styles.text}>{user?.email}</Text>
                <Pressable
                    style={styles.favoriteButton}
                    onPress={() => Boolean(user) && followUser(user)}
                >
                    <Text style={styles.favoriteText}>{favoriteUsers.some((element) => element.id === user.id) ? '❤️' : '🤍'}</Text>
                </Pressable>
            </View>
        </View>
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
        card: {
            flexDirection: 'row',
            margin: 10,
            backgroundColor: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        image: {
            width: 100,
            height: 150,
        },
        infoContainer: {
            padding: 10,
            flex: 1,
            justifyContent: 'space-between',
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        favoriteButton: {
            alignSelf: 'flex-end',
        },
        favoriteText: {
            fontSize: 24,
        },
        text: {
            fontSize: 12
        }
    }
);