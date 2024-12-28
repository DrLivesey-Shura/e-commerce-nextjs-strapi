import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
