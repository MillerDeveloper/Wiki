import UserSchema from '@/models/user.model'
import mongoose, { connection, Connection, Schema } from 'mongoose'

class DBService {
    async checkExistCollection(collectionName: string): Promise<boolean> {
        return (await connection.db.listCollections({ name: collectionName }).toArray()).length > 0
    }

    useDatabase(database: string | undefined) {
        if (database) {
            return connection.useDb(database)
        } else {
            throw new Error('Database is not available')
        }
    }
}

export default new DBService()
