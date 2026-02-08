import { ShippingFormInputs, ShippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingForm = ({ setShippingForm }: { setShippingForm: (data: ShippingFormInputs) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(ShippingFormSchema),
  });
  const router = useRouter();
  const handleShippingForm:SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push(`/cart?step=3`, { scroll: false });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleShippingForm)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-gray-500 font-medium">
          Name
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="name"
          placeholder="Shayan Dutta"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-gray-500 font-medium">
          Email
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="email"
          placeholder="shayan@gmail.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
          Phone
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="phone"
          placeholder="9988776655"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-gray-500 font-medium">
          Address
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="address"
          placeholder="Jalukbari, Guwahati"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-gray-500 font-medium">
          City
        </label>
        <input
          className="border-b border-gray-200 py-3 outline-none text-sm"
          type="text"
          id="city"
          placeholder="Guwahati"
          {...register("city")}
        />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full  hover:bg-black transition-all duration-300 bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 text-sm font-medium"
      >
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

export default ShippingForm;
