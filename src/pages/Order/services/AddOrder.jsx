import { useForm } from "react-hook-form";

export function useAddOrderForm() {
  const methods = useForm({
    defaultValues: {
      name: "ah",
      phone: "",
      address: "",
      note: "",
      city: "",
      area: "",
      items: [
        {
          productId: "",
          sizeName: "",
          colorName: "",
          quantity: "",
        },
      ],
    },
  });

  const onSubmit = (data) => {
    console.log("Order Data:", data);
  };

  return { ...methods, onSubmit };
}
