import React, { useContext } from "react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartAPIs from "../../../../utils/CartAPIs";
import { CartContext } from "../../../../Context/cartContext";

function ProductInfo({ product }) {
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);
  const router = useRouter();
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      console.log(product);

      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product.documentId],
        },
      };

      CartAPIs.addToCart(data)
        .then((res) => {
          console.log(res.data.data);
          setCart((oldCart) => [
            ...oldCart,
            {
              id: res.data.data.documentId,
              product,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      {product?.id ? (
        <div>
          <h2 className="text-[24px]">{product?.title}</h2>
          <h2 className="text-[19px] text-gray-400">{product?.category}</h2>
          <h2 className="text-[15px] mt-2">
            {product?.description[0]?.children[0].text}
          </h2>
          <h2 className="text-[15px] text-gray-500 flex gap-2 mt-2 items-center">
            {product?.instantDelivery ? (
              <BadgeCheck className="w-5 h-5 text-green-500" />
            ) : (
              <AlertOctagon />
            )}{" "}
            Eligible For Instant Delivery
          </h2>
          <h2 className="text-[28px] text-secondary mt-2 mb-2">
            $ {product?.price}
          </h2>

          <button
            onClick={() => handleAddToCart()}
            className="flex gap-2 p-3 text-white rounded-lg bg-secondary hover:bg-primary"
          >
            <ShoppingCart />
            Add To Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
}

export default ProductInfo;
