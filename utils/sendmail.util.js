import transporter from "../configs/nodeMailer.config.js";

export default async function sendEmail(mailOptions) {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        throw new Error(`Error sending email: ${ error }`);
    }
}