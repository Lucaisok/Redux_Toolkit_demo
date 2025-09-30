import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Users } from './types';
import { fetchUsers } from '../../store/users';

interface UsersState extends Users {
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    followedUsers: [],
    loading: false,
    error: null,
};

const followUser = (state: UsersState, userId: number) => {
    const userToFollow = state.users.find(user => user.id === userId);
    if (!userToFollow) {
        return;
    }
    if (!state.followedUsers.find(user => user.id === userId)) {
        state.followedUsers.push(userToFollow);
    } else {
        state.followedUsers = state.followedUsers.filter(user => user.id !== userId);
    }
};

const usersSlice = createSlice({
    name: "users",
    initialState: {
        ...initialState
    },
    reducers: {
        handleFollowUser: (state, action: PayloadAction<number>) => {
            followUser(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.error = null;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            });
    }
});

export const { handleFollowUser } = usersSlice.actions;
export default usersSlice.reducer;