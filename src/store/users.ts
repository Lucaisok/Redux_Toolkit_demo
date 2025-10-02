import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../features/users/types";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://reqres.in/api/users', {
                headers: {
                    "x-api-key": 'reqres-free-v1',
                }
            }
            );
            const data = await response.json();
            console.log('data', data);
            return data.data as User[];

        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch issues.");
        }
    }
);