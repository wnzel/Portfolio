import nodemailer from "nodemailer";
import process from "node:process";

const CONTACT_EMAIL = "wenzelescudero@gmail.com";
const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 30;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 5000;

function singleLine(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function validateContactPayload(payload) {
  const name = typeof payload?.name === "string" ? singleLine(payload.name) : "";
  const phone =
    typeof payload?.phone === "string" ? singleLine(payload.phone) : "";
  const email =
    typeof payload?.email === "string" ? singleLine(payload.email) : "";
  const company =
    typeof payload?.company === "string" ? singleLine(payload.company) : "";
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!name || !phone || !email || !message) {
    return { error: "Name, phone, email, and message are required." };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { error: "Name must be 100 characters or fewer." };
  }
  if (phone.length > MAX_PHONE_LENGTH) {
    return { error: "Phone must be 30 characters or fewer." };
  }
  if (email.length > MAX_EMAIL_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (company.length > MAX_COMPANY_LENGTH) {
    return { error: "Company must be 120 characters or fewer." };
  }
  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return { error: "Message must be between 10 and 5,000 characters." };
  }

  return { data: { name, phone, email, company, message } };
}

function getTransporter() {
  if (process.env.NODE_ENV === "test") {
    return nodemailer.createTransport({ jsonTransport: true });
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function parseBody(body) {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const validation = validateContactPayload(parseBody(request.body));
  if (validation.error) {
    return response.status(400).json({ error: validation.error });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || (!smtpPass && process.env.NODE_ENV !== "test")) {
    console.error("Contact email is missing SMTP_USER or SMTP_PASS.");
    return response.status(500).json({
      error: "Email delivery is not configured yet. Please try again later.",
    });
  }

  const { name, phone, email, company, message } = validation.data;
  const companyLine = company || "Not provided";

  try {
    await getTransporter().sendMail({
      from: `Portfolio Contact <${smtpUser}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio message from ${name}${company ? ` — ${company}` : ""}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Company: ${companyLine}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Unable to send portfolio contact email:", error);
    return response.status(500).json({
      error: "Unable to send your message right now. Please try again later.",
    });
  }
}
