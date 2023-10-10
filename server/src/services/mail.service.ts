import { createTransport } from 'nodemailer'

export const GOOGLE_USER_EMAIL = 'businesscontrolsystemcrm@gmail.com'
export const GOOGLE_USER_PASSWORD = 'jpmrinxbaqlpkudj'

class MailService {
    async sendMail(body: any) {
        const transport = createTransport({
            service: 'gmail',
            auth: {
                user: GOOGLE_USER_EMAIL,
                pass: GOOGLE_USER_PASSWORD
            }
        })

        if (!body.from) {
            body.from = GOOGLE_USER_EMAIL
        }

        return await transport.sendMail(body)
    }
}

export default new MailService()
