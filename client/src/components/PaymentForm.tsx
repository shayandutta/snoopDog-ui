import { ShippingFormInputs, ShippingFormSchema, PaymentFormInputs, PaymentFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(PaymentFormSchema),
  });
  const router = useRouter();
  const handlePaymentForm:SubmitHandler<PaymentFormInputs> = (data) => {

  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handlePaymentForm)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-gray-500 font-medium">
          Name on Card
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="cardHolder"
          placeholder="Shayan Dutta"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-xs text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-gray-500 font-medium">
          card Number
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
          card expiry date
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="expiryDate"
          placeholder="MM/YY"
          {...register("expiryDate")}
        />
        {errors.expiryDate && (
          <p className="text-xs text-red-500">{errors.expiryDate.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-gray-500 font-medium">
          cvv
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="cvv"
          placeholder="123"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500">{errors.cvv.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Image src="/klarna.png" alt="visa" width={50} height={25} className="rounded-md"/>
        <Image src="/cards.png" alt="visa" width={50} height={25} className="rounded-md"/>
        <Image src="/stripe.png" alt="visa" width={50} height={25} className="rounded-md"/>
      </div>
      <button
        type="submit"
        className="w-full  hover:bg-black transition-all duration-300 bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 text-sm font-medium"
      >
        Checkout <ShoppingCartIcon className="w-4 h-4" />
      </button>
    </form>
  );
};

export default PaymentForm;
