'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.EMAIL_HOST;
const SMTP_SERVER_USERNAME = process.env.EMAIL_USER;
const SMTP_SERVER_PASSWORD = process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
    sendTo,
    subject,
    text,
    html,
  }: {
    sendTo?: string;
    subject: string;
    text: string;
    html?: string;
  }) {
    try {
      const isVerified = await transporter.verify();
      console.log(isVerified)
    } catch (error) {
      console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
      return;
    }
    const info = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME,
      to: sendTo,
      subject: subject,
      text: text,
      html: html ? html : '',
    });
    return info;
  }