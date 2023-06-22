const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (data) => {
    const msg = { ...data, from: 'rosignolli@gmail.com', }
    await sgMail
        .send(msg)
        .then(() => {
            console.log('Email send');
        })
        .catch((error) => {
            console.log(error.message);
        })
    return true
}

module.exports = sendEmail

