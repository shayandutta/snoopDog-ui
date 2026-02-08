import { z } from "zod";


export type ProductType = {
    id: string | number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
}

export type CartItemType = ProductType &  {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

export type ProductsType = ProductType[];
export type CartItemsType = CartItemType[];


export const ShippingFormSchema = z.object({
    name:z.string().min(1, 'Name is required'),
    email:z.email().min(1, 'Email is required'),
    phone:z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\d+$/, "Phone number must contain only numbers"),
    address:z.string().min(1, 'Address is required'),
    city:z.string().min(1, 'City is required')
})

export const PaymentFormSchema = z.object({
    cardHolder:z.string().min(1, 'card holder is required'),
    cardNumber:z.string().min(16, 'card number is required').max(16, 'card number must be 16 digits'),
    expiryDate:z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date'),
    cvv:z.string().min(3, 'cvv is required').max(3, 'cvv must be 3 digits'),
})

export type ShippingFormInputs = z.infer<typeof ShippingFormSchema>; //shippingForm
export type PaymentFormInputs = z.infer<typeof PaymentFormSchema>; //paymentForm


export type CartStoreStateType = {
    cart: CartItemsType;
}

export type CartStoreActionsType = {
    addToCart: (product: CartItemType) => void;
    removeFromCart: (product: CartItemType) => void;
    clearCart: () => void;
}