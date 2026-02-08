import { ShippingFormInputs, ShippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ShippingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(ShippingFormSchema),
  });
  return <h1>Shipping Form</h1>;
};

export default ShippingForm;
