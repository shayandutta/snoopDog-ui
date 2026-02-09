"use client";

import { ProductType } from "@/types";
import {
  Minus,
  Plus,
  PlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import cartStore from "@/stores/cartStore";


const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const {addToCart} = cartStore();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product, //getting all the product information
      quantity: quantity, 
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    });
    toast.success("Product added to cart");
  }

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity: quantity,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    });
    toast.success("Product added to cart");
    router.push("/cart");
  }
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/*SIZE*/}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${selectedSize === size ? "border-gray-400" : "border-gray-200"}`}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`w-6 h-6 text-center flex justify-center items-center ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*COLOR*/}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${selectedColor === color ? "border-gray-300" : "border-white"}`}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div
                className={`w-6 h-6 `}
                style={{ backgroundColor: color }} //backgroundColor: color -> the color that the user selected
              />
            </div>
          ))}
        </div>
      </div>
      {/*QUANTITY*/}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="">{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/*BUTTONS*/}
      <button onClick={handleAddToCart} className="flex items-center justify-center cursor-pointer gap-2 bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium">
        <PlusIcon className="w-4 h-4 " />
        Add to Cart
      </button>
      <button onClick={handleBuyNow} className="ring-1 ring-gray-400 shadow-lg cursor-pointer text-gray-800 rounded-md px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium">
        <ShoppingCartIcon className="w-4 h-4" />
        Buy Now
      </button>
    </div>
  );
};

export default ProductInteraction;
