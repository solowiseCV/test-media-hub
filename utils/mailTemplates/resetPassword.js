const RESETPASSWORDLINK = "";

export default (user) => ({
    from: `Support <${process.env.USER_NAME}>`,
    to: `${user.email}`,
    subject: "Reset Media Hub's password",
    sender: "Media Hub",
    html: `<!doctype html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
            <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Hello ${user.email},</h1>
            <p>You recently requested to reset your password for the Media Hub's App. To reset your password, click the link below:</p>
            <p>${RESETPASSWORDLINK}/?token=${user.resetToken}</p>
            <p>Please note that this link is temporary and will expire in 1 hour. If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            <p>If you have any questions or need further assistance, please contact our support team at chuksaginamada.com.</p>
            <p>Best regards,</p>
            <p>The Media Hub Team.</p>
            </div>
        </body>
    </html>`
});