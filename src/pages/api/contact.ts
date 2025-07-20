import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "الطريقة غير مسموحة" });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `رسالة تواصل جديدة من ${name}`,
      text: message,
      html: `<p><b>الاسم:</b> ${name}</p><p><b>البريد:</b> ${email}</p><p><b>الرسالة:</b><br/>${message}</p>`
    });

    return res.status(200).json({ message: "تم إرسال الرسالة بنجاح!" });
  } catch (error) {
    console.error("خطأ إرسال البريد:", error);
    return res.status(500).json({ message: "حدث خطأ أثناء إرسال الرسالة" });
  }
} 