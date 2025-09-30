import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../features/users/types";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://reqres.in/api/users', {
                headers: {
                    "x-api-key": process.env.PUBLIC_API_KEY,
                }
            }
            );
            const data = await response.json();
            return data.data as User[];

        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch issues.");
        }
    }
);