"use client";

import Image from "next/image";

import { ProductType } from "@/types";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  //props with the type of the product -> basically saying that we are going to get product from the parent component as a prop and the type of the product is ProductType. So types need to be mentioned here and also in the parent component.
  const [productTypes, setProductTypes] = useState({
    //initial state of the product types
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleProductTypeChange = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev, //...prev -> Copies all existing properties (e.g. both size and color) from the previous state.
      [type]: value, //[type] is an array of property names, so it will be either "size" or "color"
    }));
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden ">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-4 p-4">
        {/* PRODUCT NAME */}
        <h1 className="text-md font-medium">{product.name}</h1>
        {/* PRODUCT DESCRIPTION */}
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZES */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Sizes</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md px-2 py-1"
              onChange={(e) => //e -> event object, e.target -> the element that triggered the event (in this case the <select> element)
                handleProductTypeChange({ type: "size", value: e.target.value }) //e.target.value -> the value of the selected option
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Colors</span>
            <div className="flex items-center gap-1">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border-1 ${productTypes.color === color ? "border-gray-400" : "border-gray-200"} rounded-full p-[1.2px]`}
                  key={color}
                  onClick={() =>
                    handleProductTypeChange({ type: "color", value: color })
                  }
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE & ADD TO CART */}
        <div className="flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2">
            <ShoppingCartIcon className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

/*
 * =============================================================================
 * FLOW, USE CASE & REASON FOR EVERYTHING (ProductCard.tsx)
 * =============================================================================
 *
 * --- WHAT THIS COMPONENT DOES ---
 * Renders one product as a card: image (changes with selected color), name,
 * short description, size/color selectors, price, and Add to Cart. The card
 * links to the product detail page. Selected size and color are kept in local
 * state so the image and UI stay in sync.
 *
 * --- THE FLOW ---
 * 1. Parent (e.g. ProductList) passes one product as a prop.
 * 2. We set initial "chosen" size and color from that product (first size,
 *    first color) using useState.
 * 3. User changes size (dropdown) or color (swatch click) → handleProductTypeChange
 *    runs → we update state (setProductTypes) → React re-renders → image and
 *    selected styles update (image uses productTypes.color, swatches compare to
 *    productTypes.color).
 * 4. Clicking the image/card goes to the product detail page (Link).
 *
 * --- WHY EACH THING IS USED ---
 *
 * props: { product }
 *   What: Data passed from the parent. One product object (ProductType).
 *   Why:  The card doesn’t own the product list; the parent does. Props are how
 *         React passes data down. Each card only needs one product to display.
 *   How:  Parent does <ProductCard product={product} />. We use product.name,
 *         product.images, product.sizes, etc. in the JSX.
 *
 * useState({ size, color })
 *   What: React state: a value that, when changed, causes the component to
 *         re-render. Here we store the user’s current size and color choice.
 *   Why:  We need to remember "which size and color the user picked" so we can
 *         show the right image (color) and highlight the right options. Without
 *         state, we couldn’t update the UI when they change selection.
 *   How:  Initial value: first size and first color from product. setProductTypes
 *         updates it; we pass that to image src and to the select/color swatches.
 *
 * setProductTypes((prev) => ({ ...prev, [type]: value }))
 *   What: Updates state by merging the previous object with one new key (either
 *         size or color). prev is the previous state; we spread it and overwrite
 *         the key that changed.
 *   Why:  React state is immutable. We don’t mutate prev; we create a new object
 *         so React knows something changed and re-renders. [type] is a computed
 *         property name: "size" or "color" so one function handles both.
 *   How:  handleProductTypeChange receives type and value, then calls
 *         setProductTypes with this updater function.
 *
 * handleProductTypeChange({ type, value })
 *   What: A function that updates the selected size or color in state.
 *   Why:  Both the size <select> and the color swatches need to update the same
 *         state. One handler keeps the logic in one place and avoids duplicate
 *         setProductTypes calls.
 *   How:  Size: onChange on <select> passes type "size" and e.target.value.
 *         Color: onClick on swatch passes type "color" and the color string.
 *
 * Link href={`/products/${product.id}`}
 *   What: Next.js Link: a link that navigates without full page reload. Wraps
 *         the image so clicking the image goes to the product detail page.
 *   Why:  Users expect to click the product to see more. Link keeps navigation
 *         fast (client-side) and the URL is shareable (/products/1, etc.).
 *   How:  href is built from product.id so each card links to its own detail page.
 *
 * product.images[productTypes.color]
 *   What: The image URL for the currently selected color. product.images is an
 *         object like { gray: "/x.png", blue: "/y.png" }; we index by color.
 *   Why:  Each color often has a different product image. Showing the image for
 *         the selected color gives correct feedback when the user picks a color.
 *   How:  productTypes.color is our state; we use it as the key into product.images.
 *
 * <select> and onChange with e.target.value
 *   What: Native HTML dropdown. onChange fires when the user picks an option;
 *         e.target is the <select>, e.target.value is the chosen option’s value.
 *   Why:  Sizes are a list; a dropdown is a standard way to pick one. We need
 *         to know which size the user chose so we can store it and later send it
 *         with "Add to Cart".
 *   How:  options from product.sizes.map. onChange calls handleProductTypeChange
 *         with type "size" and value e.target.value.
 *
 * product.colors.map for color swatches
 *   What: We render one clickable div per color. Each div shows a small circle
 *         with that color (style={{ backgroundColor: color }}). Clicking it
 *         sets the selected color.
 *   Why:  User needs to pick a color and see the image update. Swatches are a
 *         common pattern; the selected one is highlighted (border) by comparing
 *         to productTypes.color.
 *   How:  map over product.colors; onClick calls handleProductTypeChange with
 *         type "color" and value color. Selected style: productTypes.color === color.
 *
 * key={size} and key={color}
 *   What: A prop React requires on list items (from .map). Must be unique per item.
 *   Why:  React uses keys to match list items across re-renders so it can update
 *         the DOM correctly and avoid bugs. Without keys, React may reuse the
 *         wrong elements.
 *   How:  key={size} on each <option>, key={color} on each color swatch div.
 *
 * Add to Cart button
 *   What: A button that currently has no click handler (no onSubmit or add-to-cart
 *         logic yet).
 *   Why:  Placeholder for future: when clicked it should add this product with
 *         the current productTypes.size and productTypes.color to the cart.
 *   How:  Later you’d add onClick that uses product, productTypes, and cart state.
 *
 * --- ONE-LINE SUMMARY ---
 * Parent gives one product → we store chosen size/color in state → user changes
 * size or color → we update state → image and UI re-render; clicking image goes
 * to detail page via Link.
 */
