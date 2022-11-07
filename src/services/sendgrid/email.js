const sgMail = require('@sendgrid/mail');
const { Await } = require('react-router-dom');
const  SENDGRID_API_KEY = "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"




sgMail.setApiKey(SENDGRID_API_KEY);

function sendMailConfirmationHTML(customerName, orderNro) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Documento</title>
        <style>
            .responsive {
                width: 100%;
                height: auto;
            }
        </style>
    </head>
        <body>
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.memedroid.com%2Fmemes%2Fdetail%2F3734883%2FJaja-doxeado&psig=AOvVaw0eHw5Hjwe0YJos-l41Jqak&ust=1667872448449000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCOim9pj7mvsCFQAAAAAdAAAAABAE" alt="" class="responsive" />
        </body>
    </html>
    `;
}

function getMessage(emailParams) {
    return {
        to: emailParams.toEmail,
        from: 'imjuanfe22@gmail.com',
        subject: 'Doxeado',
        text: 'Hola has sido doxeado!',
        html: sendMailConfirmationHTML(
            emailParams.customerName,
            emailParams,orderNro
        ),
    };
}

async function sendOrder(emailParams) {
    try {
        await sgMail.send(getMessage(emailParams));
        return { message: 'Confirmación de Doxeo' };
    } catch (err) {
        const message = 'No te pudimos doxear, sera la proxima';
        console.error(message);
        console.error(err);
        if (err.response) console.error(err.response.body);
        return { message };
    }
}

module.exports = {
    sendOrder,
};