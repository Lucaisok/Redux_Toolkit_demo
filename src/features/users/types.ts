export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
};

export type Users = {
    users: User[];
    followedUsers: User[];
};