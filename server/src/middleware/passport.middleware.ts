import { Strategy, ExtractJwt } from 'passport-jwt'
import { connection } from 'mongoose'
import { environment } from '@/shared/enviroment'

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('authorizationToken')
    ]),
    secretOrKey: environment.jwt
}

const SELECT_FIELDS = {
    _id: true,
    email: true,
    database: true,
    companyId: true
}

export function initPassport(passport: any) {
    passport.use(
        new Strategy(options, async (payload: any, done: any) => {
            try {
                const userConnection = connection.useDb(payload.database)
                // const user = await userService
                //     .findOne(
                //         {
                //             _id: payload._id,
                //             companyId: payload.companyId
                //         },
                //         userConnection
                //     )
                //     .select(SELECT_FIELDS)

                const user: any = { connection: true }

                if (user) {
                    user.connection = userConnection
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (error) {
                console.error(error)
            }
        })
    )
}
