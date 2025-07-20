import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// تعريف موديل المنتج
const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  image: String,
});
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(process.env.MONGODB_URI!);

  if (req.method === "GET") {
    const products = await Product.find({});
    return res.status(200).json(products);
  }

  return res.status(405).json({ message: "الطريقة غير مسموحة" });
} 