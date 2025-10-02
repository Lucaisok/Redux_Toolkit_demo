import { Button, FlatList, StatusBar, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { useState } from "react";
import { addBook } from "../features/books/booksSlice";

export const MyBooksList = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const dispatch = useAppDispatch();
    // Access the books slice from the Redux store
    const booksCatalog = useSelector((state: RootState) => state.books);
    console.log('booksCatalog', booksCatalog);

    const subMitNewBook = () => {
        const newBook = { title, author, id: booksCatalog.length + 1 };
        // Dispatch an action to add the new book to the Redux store
        dispatch(addBook(newBook));
        // Clear the input fields
        setTitle("");
        setAuthor("");

    };

    return <>
        <StatusBar barStyle="dark-content" backgroundColor={'#f5f5f5'} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 }}>My Books List</Text>
        <View style={{ flex: 1 }}>
            <FlatList
                data={booksCatalog}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text style={{ fontSize: 16, color: '#555' }}>{item.author}</Text>
                    </View>
                )}
                style={{ flex: 1, backgroundColor: '#cfb8b8ff' }}
            />

        </View>
        <View style={{ flex: 1, backgroundColor: '#b8c6cfff' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 16, color: "white" }}>Add a New Book</Text>
            <TextInput
                placeholder="Title"
                style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 16, paddingHorizontal: 8 }}
                value={title}
                onChangeText={(text: string) => setTitle(text)}
            />
            <TextInput
                placeholder="Author"
                style={{ height: 40, borderColor: 'white', borderWidth: 1, margin: 16, paddingHorizontal: 8 }}
                value={author}
                onChangeText={(text: string) => setAuthor(text)}
            />
            <Button onPress={() => subMitNewBook()} title="Add Book" accessibilityLabel="Add a new book to the list" />
        </View>
    </>;
};