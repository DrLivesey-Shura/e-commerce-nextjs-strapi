"use client";

import BreadCrumb from "../../../Components/BreadCrumb";
import ProductsAPIs from "../../../utils/ProductsAPIs";
import React, { useEffect, useState } from "react";
import ProductBanner from "./components/ProductBanner";
import ProductInfo from "./components/ProductInfo";
import { usePathname } from "next/navigation";
import ProductList from "../../../Components/ProductList";

function ProductDetails({ params }) {
  const [productId, setProductId] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);

  const path = usePathname();

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      setProductId(resolvedParams.productId);
    }

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (productId) {
      getProductById_();
    }
  }, [productId]);

  const getProductById_ = async () => {
    try {
      const res = await ProductsAPIs.getProductById(productId);
      console.log(res.data.data);
      setProductDetails(res.data.data);
      getProductListByCategory(res.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getProductListByCategory = (product) => {
    ProductsAPIs.getProductsByCategory(product?.category).then((res) => {
      console.log(res?.data?.data);
      setProductList(res?.data?.data);
    });
  };

  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} />
      <div className="grid justify-around grid-cols-1 gap-5 mt-10 sm:gap-0 sm:grid-cols-2">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
        <ProductList products={productList} />
      </div>
    </div>
  );
}

export default ProductDetails;
