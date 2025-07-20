import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "الطريقة غير مسموحة" });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  await mongoose.connect(process.env.MONGODB_URI!);

  // تحقق من عدم وجود المستخدم مسبقًا
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
  }

  // تشفير كلمة المرور
  const hashedPassword = await bcrypt.hash(password, 10);

  // إنشاء المستخدم
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });
} 