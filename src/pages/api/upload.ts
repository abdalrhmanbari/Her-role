import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "الطريقة غير مسموحة" });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const form = new IncomingForm({ uploadDir: uploadsDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("خطأ رفع الصورة:", err);
      return res.status(500).json({ message: "فشل رفع الصورة" });
    }
    const fileData = files.image;
    const file = Array.isArray(fileData) ? fileData[0] : fileData;
    if (!file || Array.isArray(file) || !file.filepath || !fs.existsSync(file.filepath)) {
      console.error("لم يتم العثور على ملف الصورة بعد الرفع", file);
      return res.status(500).json({ message: "فشل رفع الصورة" });
    }
    const fileName = path.basename(file.filepath);
    const fileUrl = `/uploads/${fileName}`;
    return res.status(200).json({ url: fileUrl });
  });
}