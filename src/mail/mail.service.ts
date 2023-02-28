import { Injectable } from '@nestjs/common';
import { generateUserImageLink } from 'src/utils/generateRandomUserPick';

import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
	async sendActivationMail(to: string, link: string) {
		const transporter = nodemailer.createTransport({
			service: process.env.SMTP_SERVICE,
			host: process.env.SMTP_HOST,
			port: parseFloat(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject:
				'Account activation in CoffeeApp by Hugs for bugs Cyberdyne Systems',
			text: '',
			html: `
			<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office" lang="ru">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" /> -->
  <title>Hugs for bugs</title>
  <style type="text/css">
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');

    table {
      border-spacing: 0;
      mso-cellspacing: 0;
      mso-padding-alt: 0;
    }

    td {
      padding: 0;
    }

    #outlook a {
      padding: 0;
    }

    a {
      text-decoration: none;
      color: #e8fbfa;
      font-size: 16px;
    }

    @media screen and (max-width: 599.98px) {}

    @media screen and (max-width: 399.98px) {
      .mobile-padding {
        padding-right: 10px !important;
        padding-left: 10px !important;
      }

      .mobile-col-padding {
        padding-right: 0 !important;
        padding-left: 0 !important;
      }

      .two-columns .column {
        width: 100% !important;
        max-width: 100% !important;
      }

      .two-columns .column img {
        width: 100% !important;
        max-width: 100% !important;
      }

      .three-columns .column {
        width: 100% !important;
        max-width: 100% !important;
      }

      .three-columns .column img {
        width: 100% !important;
        max-width: 100% !important;
      }
    }

    /* Custom Dark Mode Colors */
    /* :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    @media (prefers-color-scheme: dark) {
      table,
      td {
        background-color: #06080B !important;
      }
      h1,
      h2,
      h3,
      p {
        color: #ffffff !important;
      }
    } */
  </style>

  <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      table {border-collapse: collapse !important;}
    </style>
  <![endif]-->

  <!--[if (gte mso 9)|(IE)]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
</head>

<body style="Margin:0;padding:0;min-width:100%;background-color:#dde0e1;">

  <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
         body {background-color: #dde0e1!important;}
         body, table, td, p, a {font-family: sans-serif, Arial, Helvetica!important;}
      </style>
   <![endif]-->

  <center style="width: 100%;table-layout:fixed;background-color: white;padding-top: 0px;padding-bottom: 0px;">
    <div style="max-width: 600px;background-color: #fafdfe;box-shadow: 0 0 10px rgba(0, 0, 0, .2);">

      <!-- Preheader (remove comment) -->
      <div
        style="font-size: 0px;color: #fafdfe;line-height: 1px;mso-line-height-rule:exactly;display: none;max-width: 0px;max-height: 0px;opacity: 0;overflow: hidden;mso-hide:all;">
        Hugs for Bugs
      </div>
      <!-- End Preheader (remove comment) -->

      <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
          style="color:#1C1E23;">
        <tr>
        <td>
      <![endif]-->

      <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
        style="color:#1C1E23;font-family: 'Acme', sans-serif, Arial, Helvetica;background-color: transparent;Margin:0;padding:0;width: 100%;max-width: 600px;"
        >
            <tr>
              <td>
                <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding: 0 20px 0 20px;text-align: center ;color:green;font-size: 22px;">
                      Hugs for Bugs
                    </td>
                    <td style="padding:20px 0 20px 0;text-align: center;">
                      <a href="https://proj42-production.up.railway.app/" target="_blank">
                        <img src="https://raw.githubusercontent.com/MarinaKovel/coffeemachinedata/main/design/logo.png" alt="logo" border="0" width="70">
                      </a>
                    </td>
                    <td style="padding: 0 20px 0 20px;text-align: center ; font-size: 22px;color: rgb(185, 25, 185);">
                      The art of bug design.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 0 20px 0;">
                      <p style="margin:0 0 0 0;font-size: 26px; color: rgb(185, 25, 185);">
                        Activation...
                      </p>
                  </tr>
                </table>
              </td>
            </tr>
              <tr>
              <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding: 0 10px 0 10px;">
                        <img src="${generateUserImageLink()}" alt="logo" border="0" width="70">
                    </td>
                    <td style="padding:20px 0 20px 0;">
                      <p style="margin:0 0 0 0;font-size: 22px; color: rgb(185, 25, 185);max-width: 200px;text-align: center ;">
                      Welcome and thank you for join to our app!)
                      </p>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 22px; color: rgb(185, 25, 185);max-width: 500px;">
                        Here you got activation link,click for finish registration...
                      </p>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
										  <p style="margin:0 0 0 0;text-align: center ;font-size: 20px; color: red">
                      Your activation link:
                      </p>
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 35px; color: red">
                      <a style="margin:0 0 0 0;text-align: center ;font-size: 35px; color: red" href="${link}" target="_blank">
                        Click here!
                      </a>
                      </p>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>        
                <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 30px; color: rgb(185, 25, 185);">
                            Have a good day!!
                      </p>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 22px; color: rgb(185, 25, 185);">
                            Hugs for bugs Cyberdyne Systems
                      </p>
                  </tr>
                </table>

              </td>
            </tr>

              <tr>
              <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 22px; color: rgb(185, 25, 185);">
                            ${new Date()}
                      </p>
                  </tr>
                </table>

              </td>
            </tr>

      </table>

      <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
      <![endif]-->

    </div>
  </center>

</body>

</html>
			`,
		});
	}
	async sentNewPassword(to: string, password: string) {
		const transporter = nodemailer.createTransport({
			service: process.env.SMTP_SERVICE,
			host: process.env.SMTP_HOST,
			port: parseFloat(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject:
				'Set new password in CoffeeApp by Hugs for bugs Cyberdyne Systems',
			text: '',
			html: `
			<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office" lang="ru">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" /> -->
  <title>Hugs for bugs</title>
  <style type="text/css">
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap');

    table {
      border-spacing: 0;
      mso-cellspacing: 0;
      mso-padding-alt: 0;
    }

    td {
      padding: 0;
    }

    #outlook a {
      padding: 0;
    }

    a {
      text-decoration: none;
      color: #e8fbfa;
      font-size: 16px;
    }

    @media screen and (max-width: 599.98px) {}

    @media screen and (max-width: 399.98px) {
      .mobile-padding {
        padding-right: 10px !important;
        padding-left: 10px !important;
      }

      .mobile-col-padding {
        padding-right: 0 !important;
        padding-left: 0 !important;
      }

      .two-columns .column {
        width: 100% !important;
        max-width: 100% !important;
      }

      .two-columns .column img {
        width: 100% !important;
        max-width: 100% !important;
      }

      .three-columns .column {
        width: 100% !important;
        max-width: 100% !important;
      }

      .three-columns .column img {
        width: 100% !important;
        max-width: 100% !important;
      }
    }

    /* Custom Dark Mode Colors */
    /* :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    @media (prefers-color-scheme: dark) {
      table,
      td {
        background-color: #06080B !important;
      }
      h1,
      h2,
      h3,
      p {
        color: #ffffff !important;
      }
    } */
  </style>

  <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      table {border-collapse: collapse !important;}
    </style>
  <![endif]-->

  <!--[if (gte mso 9)|(IE)]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
</head>

<body style="Margin:0;padding:0;min-width:100%;background-color:#dde0e1;">

  <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
         body {background-color: #dde0e1!important;}
         body, table, td, p, a {font-family: sans-serif, Arial, Helvetica!important;}
      </style>
   <![endif]-->

  <center style="width: 100%;table-layout:fixed;background-color: white;padding-top: 0px;padding-bottom: 0px;">
    <div style="max-width: 600px;background-color: #fafdfe;box-shadow: 0 0 10px rgba(0, 0, 0, .2);">

      <!-- Preheader (remove comment) -->
      <div
        style="font-size: 0px;color: #fafdfe;line-height: 1px;mso-line-height-rule:exactly;display: none;max-width: 0px;max-height: 0px;opacity: 0;overflow: hidden;mso-hide:all;">
        Hugs for Bugs
      </div>
      <!-- End Preheader (remove comment) -->

      <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
          style="color:#1C1E23;">
        <tr>
        <td>
      <![endif]-->

      <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
        style="color:#1C1E23;font-family: 'Acme', sans-serif, Arial, Helvetica;background-color: transparent;Margin:0;padding:0;width: 100%;max-width: 600px;"
        >
            <tr>
              <td>
                <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding: 0 20px 0 20px;text-align: center ;color:green;font-size: 22px;">
                      Hugs for Bugs
                    </td>
                    <td style="padding:20px 0 20px 0;text-align: center;">
                      <a href="https://proj42-production.up.railway.app/" target="_blank">
                        <img src="https://raw.githubusercontent.com/MarinaKovel/coffeemachinedata/main/design/logo.png" alt="logo" border="0" width="70">
                      </a>
                    </td>
                    <td style="padding: 0 20px 0 20px;text-align: center ; font-size: 22px;color: rgb(185, 25, 185);">
                      The art of bug design.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 0 20px 0;">
                      <p style="margin:0 0 0 0;font-size: 26px; color: rgb(185, 25, 185);">
                        Password restore message...
                      </p>
                  </tr>
                </table>
              </td>
            </tr>
              <tr>
              <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding: 0 10px 0 10px;">
                        <img src="${generateUserImageLink()}" alt="logo" border="0" width="70">
                    </td>
                    <td style="padding:20px 0 20px 0;">
                      <p style="margin:0 0 0 0;font-size: 22px; color: rgb(185, 25, 185);max-width: 300px;text-align: center ;">
                        Finally, here your got brand new password!
                      </p>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 22px; color: rgb(185, 25, 185);max-width: 500px;">
                        The first rule of the club is not to mention the club.
The second rule of the club is not to mention this letter.
The third club rule is not to respond to this letter.
For non-compliance with the rules: you will be expelled from the club and we will  install Node JS latest version on your fridge !
                      </p>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
										  <p style="margin:0 0 0 0;text-align: center ;font-size: 20px; color: red">
                      Your new password:
                      </p>
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 35px; color: red">
                      ${password}
                      </p>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>        
                <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 30px; color: rgb(185, 25, 185);">
                            Don't forget your pass anymore!
                      </p>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 22px; color: rgb(185, 25, 185);">
                            Hugs for bugs Cyberdyne Systems
                      </p>
                  </tr>
                </table>

              </td>
            </tr>

              <tr>
              <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                    <td style="padding:20px 20px 20px 20px;">
                      <p style="margin:0 0 0 0;text-align: center ;font-size: 22px; color: rgb(185, 25, 185);">
                            ${new Date()}
                      </p>
                  </tr>
                </table>

              </td>
            </tr>

      </table>

      <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
      <![endif]-->

    </div>
  </center>

</body>

</html>`,
		});
	}
}
