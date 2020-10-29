const nodmailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const config = require('./config.json');

const oauth2Client = new OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URL
);

oauth2Client.setCredentials({
  refresh_token: config.REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodmailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'Oauth2',
    user: config.EMAIL,
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    refreshToken: config.REFRESH_TOKEN,
    accessToken: accessToken,
  },
  tls: {
    rejectedUnauthorized: false,
  },
});
function sendMail(to, subject, html) {
  const mailOptions = {
    from: config.EMAIL,
    to,
    cc,
    bcc,
    subject,
    generatedTextFromHTML: true,
    html,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });
}
