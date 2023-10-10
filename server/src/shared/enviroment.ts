import { resolve } from 'path'

export const environment = {
    mongoURI: 'mongodb+srv://Kirill:132244@bcs.ikkfo.mongodb.net/together',
    jwt: 'Together',
    serverApiUrl:
        process.env.server || process.env.NODE_ENV === 'production'
            ? 'https://together.com/api'
            : 'http://localhost:80/api',
    clientUrl:
        process.env.client || process.env.NODE_ENV === 'production'
            ? 'https://together.com/api'
            : 'http://localhost:4200',
    tokenExpiresIn: 864000000,
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    pathToUploads: resolve(__dirname, '../', '../', 'uploads')
}
