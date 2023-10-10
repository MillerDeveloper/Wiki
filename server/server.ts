import { environment } from '@shared/enviroment'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { initPassport } from '@/middleware/passport.middleware'
import passport from 'passport'
import { connect } from 'mongoose'
import fileUpload from 'express-fileupload'
import { resolve } from 'path'
import { createServer } from 'http'
import rateLimit from 'express-rate-limit'
import { MAX_BODY_SIZE, MAX_FILE_SIZE } from '@globalShared/constants/server.contants'
import routes from './routes'

export const ORIGINS = [process.env.server || 'http://localhost:4200']

declare module 'express' {
    interface Request {
        clientIp?: string
        user?: any
        candidate?: any
        file?: any
        files?: any
        session?: any
        moduleType?: string
    }
}

const PORT = process.env.PORT || 80

class CRMServer {
    private readonly app = express()
    public isProd = process.env.NODE_ENV === 'production'
    public isDev = !this.isProd
    public server!: any

    constructor() {
        if (!process.env.NODE_ENV) {
            process.env.NODE_ENV = 'development'
        }
    }

    async initServer() {
        this.setServer()
        await this.connectMongoose()
        this.createServer()
    }

    setServer() {
        this.app.set('trust proxy', true)
        express.static(resolve(__dirname, 'uploads'))
        initPassport(passport)
        this.app.use(
            cors({
                origin: ORIGINS,
                preflightContinue: true,
                credentials: true
            })
        )

        this.app.use(
            rateLimit({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 1000, // Limit each IP to 2000 requests per `window` (here, per 15 minutes)
                standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
                legacyHeaders: false // Disable the `X-RateLimit-*` headers
            })
        )

        this.app.use(cookieParser())
        this.app.use(compression())
        this.app.use(
            fileUpload({
                limits: { fileSize: MAX_FILE_SIZE },
                safeFileNames: false,
                preserveExtension: false,
                abortOnLimit: true,
                uriDecodeFileNames: true,
                parseNested: true
            })
        )
        this.app.use(
            helmet({
                hidePoweredBy: true,
                contentSecurityPolicy: false
            })
        )
        this.app.use(
            express.json({
                limit: MAX_BODY_SIZE
            })
        )
        this.app.use(
            express.urlencoded({
                extended: true,
                limit: MAX_BODY_SIZE
            })
        )

        this.app.use('/api', routes)

        if (this.isProd) {
            this.app.use(express.static(resolve(__dirname, '../', 'client')))
            this.app.get('*', (_: any, res: any) => {
                res.sendFile(resolve(__dirname, '../', 'client', 'index.html'))
            })
        } else {
            import('morgan').then((morgan) => {
                this.app.use(morgan.default('dev'))
            })
        }
    }

    createServer() {
        this.server = createServer(this.app)
        this.server.listen(PORT, () => {
            console.info(`HTTP listening on port ${PORT} in ${process.env.NODE_ENV} mode`)
        })
    }

    async connectMongoose() {
        try {
            await connect(environment.mongoURI, {
                autoIndex: environment.isDev,
                maxPoolSize: 1000,
                socketTimeoutMS: 45000,
                serverSelectionTimeoutMS: 5000
            }).then(() => {
                console.info('MongoDB has been successfully connected')
            })
        } catch (error) {
            console.error(error)
        }
    }
}

const AppServer = new CRMServer()
AppServer.initServer()
export { AppServer }
