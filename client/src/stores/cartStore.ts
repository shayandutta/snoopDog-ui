import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";

const cartStore = create<CartStoreStateType & CartStoreActionsType>((set) => ({
    cart: [], // array of cart items
    addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
    removeFromCart: (product) => set((state) => ({ cart: state.cart.filter((item) => item.id !== product.id) })),
    clearCart: () => set({ cart: [] }),
}));

export default cartStore;