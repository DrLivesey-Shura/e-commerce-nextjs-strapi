import React from "react";
import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";
function ProductItem({ product }) {
  return (
    <Link
      href={`/product-details/${product?.documentId}`}
      className="p-1 border-teal-400 rounded-lg hover:border hover:shadow-md hover:cursor-pointer"
    >
      <Image
        src={product?.banner?.url}
        alt="banner-card"
        width={400}
        height={350}
        className="rounded-t-lg h-[170px] object-cover"
      />
      <div className="flex items-center justify-between p-3 rounded-b-lg bg-primary">
        <div className="">
          <h2 className="text-[12px] font-medium line-clamp-1">
            {product?.title}
          </h2>
          <h2 className="text-[10px] text-gray-400 flex  gap-1 items-center">
            <List className="w-4 h-4" /> {product?.category}
          </h2>
        </div>
        <h2>{product?.price}</h2>
      </div>
    </Link>
  );
}

export default ProductItem;
