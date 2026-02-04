import nodemailer from "nodemailer";


export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohmed.sayed2002333@gmail.com",
      pass: "nxba haqq fflp wxyn"
    }
  });

  await transporter.sendMail({
    from: `"my app" <mohmed.sayed2002333@gmail.com>`,
    to,
    subject,
    html
  });
};
