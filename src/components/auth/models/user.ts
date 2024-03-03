import { ObjectId } from 'mongodb';

export interface user {
    username: string
    email: string
    password: string
}

export interface userDB {
    _id: string | ObjectId
    email: string
}