import { ObjectId } from 'mongodb';

export interface user {
    username: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export interface userDB {
    _id: string | ObjectId
    email: string
}