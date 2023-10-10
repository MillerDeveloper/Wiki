import { Router, Request, Response } from 'express'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import { connection, Types } from 'mongoose'
import { sign } from 'jsonwebtoken'
import { environment } from '@/shared/enviroment'
import { hash, genSaltSync } from 'bcryptjs'
import { createHash } from 'crypto'
import userModel, { SYSTEM_LANGS } from '@/models/user.model'
import { PASSWORD_VALIDATE } from '@/shared/constants/validator.contacts'
import MailService from '@/services/mail.service'

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    if (!isEmail(email)) {
        return res.status(401).json({ message: 'Wrong email' })
    }

    if (password.length !== 32) {
        password = createHash('md5').update(password).digest('hex')
    }

    const candidate = await userModel.findOne({ email: email })
    if (candidate) {
        if (await candidate.comparePassword(password)) {
            if (candidate.confirmations?.email.confirmed) {
                const token = sign(
                    {
                        _id: candidate._id,
                        email: email
                    },
                    environment.jwt,
                    { expiresIn: environment.tokenExpiresIn }
                )

                res.cookie('token', `Bearer ${token}`, {
                    maxAge: environment.tokenExpiresIn,
                    path: '/',
                    sameSite: 'lax',
                    secure: environment.isProd,
                    httpOnly: false
                })

                res.status(200).json({
                    user: {
                        email: candidate.email,
                        name: candidate.name,
                        surname: candidate.surname
                    },
                    token
                })
            } else {
                res.status(400).json({
                    message: 'Email is not confirmed',
                    translatePath: 'global.confirmYourEmail'
                })
            }
        } else {
            res.status(400).json({
                message: 'Wrong password',
                translatePath: 'global.wrongPassword'
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found',
            translatePath: 'global.userNotFound'
        })
    }
})

router.post('/register', async (req: Request, res: Response) => {
    const { email, passwordConfirm, name, surname } = req.body
    let { password } = req.body

    if (name?.length <= 3 || surname?.length <= 3) {
        return res.status(400).json({ message: 'Invalid data' })
    }

    if (!password) {
        return res.status(400).json({
            message: 'Wrong password'
        })
    } else if (password.length !== 32) {
        password = createHash('md5').update(password).digest('hex')
    }

    if (isStrongPassword(password, PASSWORD_VALIDATE)) {
        if (password === passwordConfirm) {
            if (isEmail(email)) {
                const userId = new Types.ObjectId()
                const user = {
                    _id: userId,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: email,
                    password: await hash(password, genSaltSync(10)),
                    confirmations: {
                        email: {
                            code: sign({ email }, environment.jwt),
                            confirmed: false
                        }
                    }
                }

                const createdUser: any = await userModel.create({
                    ...user,
                    language: req.acceptsLanguages(SYSTEM_LANGS) || 'en'
                })

                await sendConfirmRegisterMail(createdUser)
                res.status(201).json({
                    createdUser: {
                        email: createdUser.email,
                        name: createdUser.name,
                        surname: createdUser.surname,
                        createdAt: createdUser.createdAt
                    }
                })
            } else {
                return res.status(400).json({ message: 'Email is not a valid' })
            }
        } else {
            return res.status(400).json({ message: 'Passwords are not equals' })
        }
    } else {
        return res.status(400).json({ message: 'Password is not strong' })
    }
})

router.get('/confirm/email/:database/:code', async (req: Request, res: Response) => {
    const code = req.params.code
    const database = req.params.database
    const navigateAfterConfirmation = environment.clientUrl + 'auth/login'

    if (code && database) {
        const user = await userModel.findOne({
            'confirmations.email.code': code
        })

        if (user) {
            user.confirmations.email = {
                confirmed: true,
                code: null
            }

            await user.save()
            res.redirect(navigateAfterConfirmation + '?successEmailConfirmed=true')
        } else {
            res.redirect(navigateAfterConfirmation + '?userNotFound=true')
        }
    } else {
        res.redirect(navigateAfterConfirmation + '?invalidData=true')
    }
})

export async function sendConfirmRegisterMail(createdUser: any) {
    await MailService.sendMail({
        to: createdUser.email,
        subject: 'Confirm registration',
        html: `
            <h1>Email Confirmation</h1>
            <h2>Hello ${createdUser.name} ${createdUser.surname ?? ''}</h2>
            <p>Thank you for registration. Please confirm your email by clicking on the following link</p>
            <a 
                href=${environment.serverApiUrl}/auth/confirm/email/${createdUser.database}/${
            createdUser.confirmations?.email.code
        }
            > 
                Click here
            </a>
            </div>
        `
    })
}

export default router
