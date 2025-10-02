import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RangeType = 1 | 2 | 3 | 4 | 5;

interface Book {
    id: number;
    title: string;
    author: string;
    rating?: RangeType;
}


type BooksState = Book[];

const initialState: BooksState = [{
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
}];

// Since there are no actions defined for books, we can just return the state as is.
const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            state.push(action.payload);
        },
        removeBook: (state, action: PayloadAction<number>) => {
            state.filter(book => book.id !== action.payload);
        },
        addRating: (state, action: PayloadAction<{ id: number, rating: RangeType; }>) => {
            const bookId = action.payload.id;
            const rating = action.payload.rating;
            const book = state.find(book => book.id === bookId);
            if (book) {
                book.rating = rating;
            }
        }
    },
    extraReducers: (builder) => { }
});

export default booksSlice.reducer;
export const { addBook, removeBook, addRating } = booksSlice.actions;