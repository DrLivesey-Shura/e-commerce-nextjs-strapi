"use client";

import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductsAPIs from "../utils/ProductsAPIs";

function ProductSection() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = () => {
    ProductsAPIs.getLatestProducts().then((res) => {
      console.log(res.data.data);
      setProductList(res.data.data);
    });
  };

  return (
    <div className="px-10 py-8 md:px-28">
      <ProductList products={productList} />
    </div>
  );
}

export default ProductSection;
