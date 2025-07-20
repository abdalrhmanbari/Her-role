import React from "react";
type ProductCardProps = {
  image: string;
  title: string;
  price: string;
  location?: string;
};

const ProductCard = ({ image, title, price, location }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center gap-2 text-gray-900">
      <img src={image} alt={title} className="w-34 h-34 rounded-md object-contain mb-2" />
      {/* <Image src={`${image}`} alt={title} width={200} height={200} className="w-24 h-24 object-contain mb-2" /> */}
      <h3 className="font-bold text-lg">{title}</h3>
      <span className="text-gray-700 text-base">{price}</span>
      {location && <span className="text-gray-400 text-sm">{location}</span>}
    </div>
  );
};

export default ProductCard; 